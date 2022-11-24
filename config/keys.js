// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys!!!
  module.exports = require('./dev');
}


// When you deploy your server to Hiroku, there is an existing environment variable called Node Underscore Envy.
// That environment variable tells us whether or not we are running in a production environment.