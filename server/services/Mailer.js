const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
//const {mail} = sendgrid

const keys = require('../config/keys');

class Mailer extends helper.Mail {
  //constructor called when 'new' xxxx(args) called, args goes into constructor
  // destructuring subject/recipient and html (content)
  constructor({ subject, recipients }, content) {
    //es2015 classes
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    //'helper is sendgrid stuff'
    this.from_email = new helper.Email('no-reply@maily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    //add stuff to mailer
    this.addContent(this.body);
    //enable click tracking
    this.addClickTracking();

    this.addRecipients();
  }
  formatAddresses(recipients) {
    //destructure email es2015 from recipients
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = await this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}
module.exports = Mailer;
