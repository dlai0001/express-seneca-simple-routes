let seneca = require('seneca')();
//let SimpleRouter = require("express-seneca-simple-routes");
let SimpleRouter = require("../index");
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

// use express-seneca-simple-routes middleware
let app = express();
app.use(router);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
