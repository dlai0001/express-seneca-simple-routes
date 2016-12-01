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

test('it calls seneca action with correct route params if route is matched', function (assert) {
	assert.plan(4);

	let seneca = {
		act: sinon.spy()
	}

	let req = {
		url: "/user/123"
	};
	let next = sinon.spy();
	let res = sinon.spy();

	let router = new SimpleRoutes(seneca);
	router.register({
		"userDetail":"/user/:id"
	});

	router(req, res, next);

	assert.ok(seneca.act.called);
	let calledArgs = seneca.act.args[0][0];
	assert.equal(calledArgs.role, "web");
	assert.equal(calledArgs.route, "userDetail");
	// assert.equal(calledArgs.params.id, '123');
});
