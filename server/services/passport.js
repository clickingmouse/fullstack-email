const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //user.id = mongodb id
});

// turn id into mongo user instance
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//      callbackURL: 'http://localhost:5000/auth/google/callback'
//https://protected-wave-29756.herokuapp.com
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //      callbackURL: 'http://localhost:5000/auth/google/callback',
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    //    (accessToken, refreshToken, profile, done) => {
    async (accessToken, refreshToken, profile, done) => {
      //console.log('accessToken:: ', accessToken);
      //console.log('refreshToken:: ', refreshToken);
      //console.log('profile:: ', profile);

      const existingUser = await User.findOne({ googleId: profile.id });
      //.then(existingUser => {
      if (existingUser) {
        //already have record
        done(null, existingUser);
      } else {
        // make a new record
        const user = await new User({ googleId: profile.id }).save();
        //.then(user =>
        done(null, user); //);
      }
      //});
    }
  )
);
