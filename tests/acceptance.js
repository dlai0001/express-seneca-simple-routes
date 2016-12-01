var test = require('tape');

test('foo test', function (t) {
	t.plan(1);

	var Routes = require('../index');
  var r = new Routes('baz');

	t.equal(r(), "barbaz");
});
