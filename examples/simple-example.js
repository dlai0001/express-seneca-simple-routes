let seneca = require('seneca')();
let SimpleRouter = require("../index");
let express = require("express")

// setup your routes
let router = new SimpleRouter(seneca);
router.register({
  userDetails: "/user/:id"
});

// route handling actors
seneca.add('role:web,route:userDetails', (msg, reply) => {

  if(msg.method != "GET") {
    return reply(new Error("ONLY GET supported"));
  }

  msg.response.send(`user id: ${msg.params.id}`);
  reply();
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
