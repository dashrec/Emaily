const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// So one argument means we are trying to fetch something out of users. Two arguments means we're trying to load something into it.
const User = mongoose.model('users');

passport.serializeUser((user, done) => { // So user is whatever we just pulled out of the database.
  done(null, user.id); //passports done as a callback that we have to call after we have done some work of nudging passport along. null = saying no error
});

passport.deserializeUser((id, done) => { // users id
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(  //hey passport I want you to be aware that there is a new strategy available and here it is, make use of it.
new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', // redirect from google after user grants permissions to this url back to our app
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(existingUser => { //If one exists, we're going to call that the existing user. So this will be a model instance in model instance that represents a user who was found now if no user.
      if (existingUser) {        // we already have a record with the given profile ID
        done(null, existingUser); //tell passport all is fine here is user
      } else {
        // we don't have a user record with this ID, make a new record!
        new User({ googleId: profile.id }).save()
          .then(user => done(null, user)); // get that user from db
      }
    });
  }
)

);
// by calling the done callback or the done function. This tells Passport that we have now finished making this user.

//deserialize user and serialize user. the purpose of each of these is to take a user model that was sourced from this step right here,
//and generate some little token out of it that will be stuffed into the cookie.