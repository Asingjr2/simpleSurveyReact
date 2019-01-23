const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Creating record shape. */
const userSchema = new Schema({
  googleID: String,
  name: String,
  age: Number,
  favCharacter: String
});

/** Equivalent to a collection. */
mongoose.model('users', userSchema);


