const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

/** Creating variable that will not cause recreation of collection. */
const User = mongoose.model('users');

/** 
 * Done is a callback that handles promises (null is err).
 * User.id is identifying bit of info from object. 
 * Mongo id has shortcut where you can just call user.id.
 * Function creates a cookie taking user info and transforming it..
 */
passport.serializeUser((user, done) => {
  console.log('user info', user);
  done(null, user.id);
});

/** 
 * Filtering through mongoose collection for user. 
 * Done arguements are error and returned user object.
 * Need to reseasrch below function and where info is coming from.
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log('deserealizing user', user);
    done(null, user);
  })
});
/**
 * Adding in hidden keys for use.
 * Callback url is redirect address when sent from google auth endpoint.
 * Below will be final code for what to do when oauth is succesffully.
 * Below needs to be executed, but does not need to be a variable.
 */


 //************* UNCLEAR WHY REFRESH TOKEN IS NEEDED */
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  /** Searching collection for user and working from promise. */
  User.findOne({  googleID: profile.id}).then((existingUser) => {
    if (existingUser) {
      /** this user exists we do not need new record */
      console.log('user exists already', existingUser);
      // Returning null for err and then object of user profile.
      done(null, existingUser);
    } else {
      console.log('creating a new user', existingUser)
      new User({ googleID: profile.id, 
      name: 'another_user',
      age: 40,
      favCharacter: 'Brolly'
      }).save().then( user => {
        console.log('creating user...')
        done(null, user.name)
      })
    }
  })

    }
  )
); 

