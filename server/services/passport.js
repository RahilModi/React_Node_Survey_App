const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('../config/key');

passport.use(
  new googleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, tokenSecret, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('referesh token', tokenSecret);
      console.log('profile: ', profile);
    }
  )
);
