const mongoose = require('mongoose');
const _ = require('lodash'); 
const { URL } = require('url'); // integrated module in node
const { Path } = require('path-parser');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys'); // this approach is for running test

module.exports = (app) => {

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false, //exclude recipients
    });

    res.send(surveys);
  });



  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });


  app.post('/api/surveys/webhooks', (req, res) => {
  
   const p = new Path('/api/surveys/:surveyId/:choice');
// chain makes it possible not to have any temporary variable. kind of chains functions and at he and calls the value
 _.chain(req.body).map(({ email, url }) => { //destruct event
        const match = p.test(new URL(url).pathname); // pathname extracts only path from url. p.test extracts surveyId and choice out of path
        if (match) { // So now at this point, match will either be an object or it will be null if test was not able to extract both the surveyId and the choice.
          return { email, surveyId: match.surveyId, choice: match.choice }; // email:email condensed down to email because key and value are identical
        }
      }).compact().uniqBy('email', 'surveyId').each(({ surveyId, email, choice }) => { // It goes through all the elements in the array and removes any elements that are undefined. uniqBy prevents duplicate emails on the same survey 
        Survey.updateOne(
          {                     // it finds document with that id and sub doc with that email and responded value false
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }, 
            },
          },
          {//$inc stands for increment and its a mongo operator. says find choice prop increment by 1 to provide yes or no
            $inc: { [choice]: 1 },  // second object is update with it based on first object
            $set: { 'recipients.$.responded': true }, // $set mongo operator. inside might be many emails so this $ sign lines up with the elemMatch to set it 
            lastResponded: new Date(),
          }
        ).exec(); // exec to actually execute that query
      })
      .value();
      
    
      res.send({});
  });





  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({ // create new instance of a survey
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({ email: email.trim() })), // It will split the entire string by every comma inside of it and return an array of strings. trim if there might be some trailing or leading spaces on each email.
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));//first argument is going to be an object with subject and recipient's second argument will be the HTML to use inside the body of the email.

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
