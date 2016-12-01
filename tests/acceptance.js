"use strict";
let test = require('tape');
let sinon = require('sinon');

let SimpleRoutes = require("../index");


test('it calls next() if route is not handled', function (assert) {
	assert.plan(1);
	let seneca = null

	let req = {
		url: "/nonexistentroute"
	};
	let next = sinon.spy();
	let res = sinon.spy();	

	let router = new SimpleRoutes(seneca);
	router.register({});

	router(req, res, next);

	assert.ok(next.called);
});
