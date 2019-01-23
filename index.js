const express = require('express');
const mongoose = require('mongoose');
require('./models/User'); // just requiring ensures code runs.
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

const app = express();

/** Passing address for mongoDB. */
mongoose.connect(keys.mongoAddress, { useNewUrlParser: true });

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
