const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User'); // just requiring ensures code runs.
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');


/** Passing address for mongoDB. */
mongoose.connect(keys.mongoAddress, { useNewUrlParser: true });

const app = express();
/** 
 * Creating cooking using passport. 
 * Keys array will give passport option to select on at random.
*/
app.use(
  cookieSession({
    maxAge: 2 * 24 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

/** Telling app to use passport with session. */
app.use(passport.initialize());
app.use(passport.session());



/** 
 * Created arrow function to update routes from other module. * Javascripts also allows 'piping'.
 * Could do one liner for updating routes as 
 * require('./routes/authRoutes')(app).
 */
authRoutes(app);
/** 
 * Javascripts also allows 'piping'.
 * Could do one liner for updating routes as 
 * require('./routes/authRoutes')(app); */

const PORT =  process.env.PORT || 5000;

app.listen(PORT);
