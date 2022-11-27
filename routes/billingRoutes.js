const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => { // request handler async(req, res) objects
    const charge = await stripe.charges.create({  // create the actual charge and then bill the credit card and then send a response back to api from Stripe saying Hey Charge successfully created.
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id // the ID from that token object 
    });

    req.user.credits += 5;

    const user = await req.user.save(); // user model just returned from after user update

    res.send(user); // send back whoever make the request
  });
};

// We need to somehow get a reference to the current user model, the person who just made this request or just attempted to pay some money into their account.
//whenever we are making use of passport, user has signed into our application, we can access the current user model as req.user wired up inside index.js passport.initialize and session
// module.exports Then immediately exported that function and then we made use of it inside of our top level index JS file.