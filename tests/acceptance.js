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
		assert.equal(msg.request, req);
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

test('it passes errors back to expressjs', function (assert) {
	assert.plan(1);

	let MyError = function() {
		this.name = "MyError";
	}

	MyError.prototype = Error.prototype;

	let req = {
		url: "/user/123"
	};
	let next = (err) => {
		assert.equal(err.name, "MyError");
	};
	let res = sinon.spy();

	let seneca = require('seneca')();
	seneca.add('role:web,route:userDetail', (msg, reply) => {
		return reply(new MyError());
	});

	let router = new SimpleRoutes(seneca);
	router.register({
		"userDetail":"/user/:id"
	});

	router(req, res, next);

});
