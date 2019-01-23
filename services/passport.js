const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

/** Creating variable that will not cause recreation of collection. */
const User = mongoose.model('users');
/**
 * Adding in hidden keys for use.
 * Callback url is redirect address when sent from google auth endpoint.
 * Below will be final code for what to do when oauth is succesffully.
 * Below needs to be executed, but does not need to be a variable.
 */
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, profile, done) => {
  console.log(accessToken);
  console.log(profile);
  new User({ googleID: profile, 
  name: 'another_user',
  age: 40,
  favCharacter: 'Brolly'
  }).save();
    }
  )
); 
