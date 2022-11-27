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

passport.use(
  //hey passport I want you to be aware that there is a new strategy available and here it is, make use of it.
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // redirect from google after user grants permissions to this url back to our app
      proxy: true, // So we just say, hey, Google strategy, if our request runs through any proxy, that's totally fine. Just deal with it.
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
// by calling the done callback or the done function. This tells Passport that we have now finished making this user.

//deserialize user and serialize user. the purpose of each of these is to take a user model that was sourced from this step right here,
//and generate some little token out of it that will be stuffed into the cookie.