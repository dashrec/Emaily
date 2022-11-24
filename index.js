const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI);
console.log('Connected to the mongoDB');
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // Max age is how long this cookie can exist inside the browser before it is automatically expired. 30days 24h 60-min 60-sec mil
    keys: [keys.cookieKey] // encrypted cookieKey is defined in config file
  })
  );

app.use(passport.initialize()); 
app.use(passport.session()); // tell passport make use cookies to handle authentication

require('./routes/authRoutes')(app); //app immediately  calls  a function we required

const PORT = process.env.PORT || 5000;  // It says look at the underlying environment and see if they have declared a port for us to use.
app.listen(PORT);



// We might have several different express applications. And so by calling Express like a function, it generates a new application that represents a running express app.
// By calling app DOT get by calling that function, we are creating a brand new Route handler.  that is watching for incoming HTTP requests with a very specific method.
// The arrow function is called automatically by express. Any time some request comes into this route, a forward slash or whatsoever.
// node is waiting for traffic to flow in  and then that traffic is routed onto express.
// The access token automatically expires after some amount of time, and we can be given optionally a refresh token that allows us to automatically update the access 
// token and essentially reach into the users account for some additional amount of time.