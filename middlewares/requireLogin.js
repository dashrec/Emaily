module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

// if user is logged in call next to next middleware
  next();
};


// The next middleware you can think of is kind of being like that done callback that we saw inside of some of our passport code.
// if there are other middle ware in chain next will pass it through next middleware