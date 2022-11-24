const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);


// This 2 line says the mongoose object has a property called schema. Take that property and assign it to a new variable called Schema.
// Mongoose wants to know all of the different properties that our records will have inside of our database, and it requires us to define all those ahead of time with the schema object.