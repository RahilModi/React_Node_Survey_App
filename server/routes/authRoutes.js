const passport = require('passport');

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/');
//   }
// );
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/', (req, res) => {
    res.send('Home Page');
  });

  app.get('/auth/google/callback', passport.authenticate('google'));
};
