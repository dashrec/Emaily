const passport = require('passport');


module.exports = app => {

  app.get('/auth/google',
    passport.authenticate('google', { //use the strategy called Google. the Google strategy has an internal identifier of Google,
      scope: ['profile', 'email'],  // we are asking Google to give us access to this user's profile information and their email address as well.
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google')); // get use profile 


  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/currentuser', (req, res) => {
    res.send(req.user);
  });

}