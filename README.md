[![Build Status](https://travis-ci.org/dlai0001/express-seneca-simple-routes.svg?branch=master)](https://travis-ci.org/dlai0001/express-seneca-simple-routes)

![Seneca][Logo]

# express-seneca-simple-routes
A express middleware for routing to seneca microservices framework, http://senecajs.org/, actions.

## Install

```
npm install express-seneca-simple-routes
```
## Usage:

```javascript
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
  // msg.params - route parameters
  // msg.request - express request object
  // msg.response - express response object

  msg.response.send(`user id: ${msg.params.id}`);
  done();
});

// use express-seneca-simple-routes middleware
let app = express();
app.use(router);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
```


[Logo]: http://senecajs.org/files/assets/seneca-logo.png
