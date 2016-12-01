
module.exports = class ExpressSenecaSimpleRoute {
    constructor(bar) {
      this.bar = bar;
      return this.foo.bind(this);
    }

    foo() {
        return "bar" + this.bar;
    }
}
