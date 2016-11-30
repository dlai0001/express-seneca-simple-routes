var test = require('tape');

test('foo test', function (t) {
	t.plan(1);

	var SenecaRoute = require('../index');
        var r = new SenecaRoute();
	t.equal(r.foo(), "bar");
    });