const passport = require('passport');

/** 
 * Get method takes initial string and then authentication direction. 
 * Exporting as function so index app object is updated.
 */
module.exports = (app) => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  })
  );
  
  /** Call back handled with include gmail secret session code. */
  app.get('/auth/google/callback', passport.authenticate('google'));

  /** Added to check if user is logged in.  Test endpoint. */
  app.get('/api/current_user', (req, res) => {
    res.send(req.user.id);
    console.log('here is our user', req.user)
  } );

  app.get('/api/logout', (req, res) => {
    req.logout();
    console.log('logging out')
    res.send(req.user);
  })

}
