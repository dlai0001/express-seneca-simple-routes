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

	let req = {
		url: "/user/123"
	};
	let next = sinon.spy();
	let res = sinon.spy();

	let seneca = require('seneca')();
	seneca.add('role:web,route:userDetail', (msg, reply) => {
		assert.equal(msg.params.id, '123');
		assert.equal(msg.reqest, req);
		assert.equal(msg.response, res);
		assert.equal(msg.next, next);

		return reply(null, {});
	});



	let router = new SimpleRoutes(seneca);
	router.register({
		"userDetail":"/user/:id"
	});

	router(req, res, next);


});
