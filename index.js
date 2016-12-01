'use strict';
let Route = require('route-parser');


module.exports = class ExpressSenecaSimpleRoute {
    constructor(senecaInstance) { 
    	this.seneca = senecaInstance;    	
      	
    	// returns function binded to this class.
      	var requestHandler = this.handleRequest.bind(this);
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

    handleRequest(req, res, next) {
		//handle req.url    	    	
    	next();
    }
}
