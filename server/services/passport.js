const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  //for multiple authentication like googel, facebook features support like it might be possible every user doesnot have googleId or facebookId
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, tokenSecret, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record  with the given id so no need to create new user
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
