let seneca = require('seneca')();
let SimpleRouter = require("express-seneca-simple-routes");
let express = require("express")

// setup your routes
let router = new SimpleRouter(seneca);
router.register({
  userDetails: "/user/:id"
});

// route handling actors
seneca.add('role:web,route:userDetails', (msg, done) => {
  msg.response.send(`user id: ${msg.params.id}`);
  done();
});

// Hookup express middleware
let app = express();
app.use(router);
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
