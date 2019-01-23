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

  app.get('/hey', (req, res) => {
    res.send({
      hi: 'friend'
    });
  })
}
