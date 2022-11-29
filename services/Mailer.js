const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail { //we are extending the Mail class provided inside of the sendgrid library.
  constructor({ subject, recipients }, content) {
    super();
// So our Mailer expects us to have a from email property that contains exactly who is sending the email, subject body and recipients
    this.sgApi = sendgrid(keys.sendGridKey); //sendgrid we required and our key. returns an object that we can use to communicate with the grid API
    this.from_email = new helper.Email('compassitinfo@gmail.com'); // So whenever we make an instance of the Mailer, that instance will have a very specific from email property.
    this.subject = subject;
    this.body = new helper.Content('text/html', content); // sec arg we passed in constructor
    this.recipients = this.formatAddresses(recipients);// sec destructed recipients in constructor
// So helper email and helper content are two helper functions from the SunGard library that properly format both from email and the body of the email to work correctly

// those are built in functions of helper.Mail that we extended
    this.addContent(this.body); // We have to actually kind of register this body with the email, with the mailer itself.
    this.addClickTracking(); // We're now going to enable click tracking inside of our email. will scan the email and automatically replace every one of there's every link with one of their special own links.
    this.addRecipients();
  }

  // Remember that every recipient inside of this function is an object that contains an email property and we just care about the email here.
  formatAddresses(recipients) {
    return recipients.map(({ email }) => { // recipient we will extract just the email and then return it.   // destructuring -> ({ email }) 
    return new helper.Email(email);
    });
  }

// doc says just write this code, and that's pretty much it.
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient); // So for each one of those, take them and add them to the personalized object.
    });
    this.addPersonalization(personalize); //addPersonalization is a function that is defined by the mail base class and add the entire personalized object.
  }

  async send() {
    const request = this.sgApi.emptyRequest({method: 'POST', path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request); // API  is a function that is provided by the sgApi.
    return response;
  }
}

module.exports = Mailer;


