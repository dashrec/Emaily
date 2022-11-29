const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');



mongoose.connect(keys.mongoURI);
console.log('Connected to the mongoDB');
const app = express();

// This middleware will parse the body and then assign it to the req.body property of the incoming request object.
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // Max age is how long this cookie can exist inside the browser before it is automatically expired. 30days 24h 60-min 60-sec mil
    keys: [keys.cookieKey] // encrypted cookieKey is defined in config file
  })
  );

app.use(passport.initialize()); 
app.use(passport.session()); // tell passport make use cookies to handle authentication

require('./routes/authRoutes')(app); //app immediately  calls  a function we required
require('./routes/billingRoutes')(app);
// So remember both of these files, the auth routes and billing route files, they return a function, they export a function.
require('./routes/surveyRoutes')(app);


if (process.env.NODE_ENV === 'production') { // in prod mode we do not have create app server which handles routes for client side
  // Express will serve up production assets like our main.js file, or main.css file! /client/build/static/js/main
  app.use(express.static('client/build')); // if any request comes in for some routes or some file or absolutely anything to our application and we do not understand what it's looking for, have a route handler set up for this thing, then look into the client build directory and try to see if there's some file inside of there that matches up with what this request is looking for.

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => { //Essentially, this says if someone makes a request for a route that we do not understand inside server or client side, just serve it up index.html. 
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;  // It says look at the underlying environment and see if they have declared a port for us to use.
app.listen(PORT);



// We might have several different express applications. And so by calling Express like a function, it generates a new application that represents a running express app.
// By calling app DOT get by calling that function, we are creating a brand new Route handler.  that is watching for incoming HTTP requests with a very specific method.
// The arrow function is called automatically by express. Any time some request comes into this route, a forward slash or whatsoever.
// node is waiting for traffic to flow in  and then that traffic is routed onto express.
// The access token automatically expires after some amount of time, and we can be given optionally a refresh token that allows us to automatically update the access 
// token and essentially reach into the users account for some additional amount of time.