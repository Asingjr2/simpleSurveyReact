const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

/** Express will handle http requests with route handlers. */ 

/**
 * Creating strategy instance with config arguments.
 */
const app = express();

/**
 * Adding in hidden keys for use.
 * Callback url is redirect address when sent from google auth endpoint.
 * Below will be final code for what to do when oauth is succesffully.
 */
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken) => console.log(accessToken))); 


app.get('/', (req, res) => {
  res.send({
    hi: 'there'
  });
})


/** Get method takes initial string and then authentication direction. */
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
})
);

/** Call back handled with include gmail secret session code. */
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT =  process.env.PORT || 5000;
app.listen(PORT);
