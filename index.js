'use strict';
let Route = require('route-parser');


module.exports = class ExpressSenecaSimpleRoute {

    /**
    * constructor
    * @param {object} senecaInstance - Running instance of seneca
    */
    constructor(senecaInstance) {
      this.seneca = senecaInstance;

    	// returns function binded to this class.
      let requestHandler = this.handleRequest.bind(this);
      requestHandler.register = this.register.bind(this);

      return requestHandler;
    }

    /**
    * Registers routes.
    * @example
    * ExpressSenecaSimpleRoute.register({
		"allUsers":"/users",
		"userDetail":"/users/:id",
		"userDetailComments":"/users/:id/comments"
    });
    */
    register(routeDictionary) {

    	this.routes = []; // tracks routes registered

    	for(let routeName in routeDictionary) {
    		(function(routes, name, path){
    			let routeObj = new Route(path);
    			routes.push({
    				name: name,
    				routeObj: routeObj
    			});
    		})(this.routes, routeName, routeDictionary[routeName]);
    	}
    }

    /**
    * handles express middleware request.
    * @param req - request
    * @param res - response
    * @param next - next handler
    */
    handleRequest(req, res, next) {

    	for(let index in this.routes) {
    		let routeEntry = this.routes[index]

    		let result = routeEntry.routeObj.match(req.url);

    		if(result !== false) {

    			return this.seneca.act({
    				role: "web",
    				route: routeEntry.name,
            method: req.method,
    				params: result,
            reqest: req,
            response: res,
            next: next
    			}, function(err) {
    				if(err) {
              return next(err);
            }
    			});

    		}
    	}
    	return next();
    }
}
