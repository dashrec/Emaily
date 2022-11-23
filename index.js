const express = require('express');
const app = express();

app.get('/', (req, res) => {  // route handler. req representing the incoming request. 
  res.send({ hi: 'there' }); // res.send Immediately send some JSON back to who made this request
});

const PORT = process.env.PORT || 5000;  // It says look at the underlying environment and see if they have declared a port for us to use.
app.listen(PORT);




// We might have several different express applications. And so by calling Express like a function, it generates a new application that represents a running express app.
// By calling app DOT get by calling that function, we are creating a brand new Route handler.  that is watching for incoming HTTP requests with a very specific method.
// The arrow function is called automatically by express. Any time some request comes into this route, a forward slash or whatsoever.
// node is waiting for traffic to flow in  and then that traffic is routed onto express.