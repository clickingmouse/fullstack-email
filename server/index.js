const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
//const passportConfig =
require('./services/passport');

//const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

//authRoute
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//for production
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assest like main.js or main.csss file
  app.use(express.static('client/build'));

  //Express will serve up index.html file if it does recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*
app.get('/', (req, res) => {
  res.send({ hi: 'there!' });
});
*/
const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000);
