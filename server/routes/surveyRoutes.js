const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//sidestep testing issue
const Survey = mongoose.model('surveys');
module.exports = app => {
  app.get('api/surveys/thanks', (req, res) => {
    res.send('thanks for voting');
  });
  //check if user is logged in
  //check credit beffore sending survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //ES6 destructuring
    const { title, subject, body, recipients } = req.body;
    //create mongo instance
    //lowercase mean instance
    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      //      recipients:recipients.split(',').map(email =>{return {email:email}})
      //recipients: recipients.split(',').map(email => ({ email })), //ES6
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    // send email after creating survey
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      //asynch function
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422);
    }
  });
};
