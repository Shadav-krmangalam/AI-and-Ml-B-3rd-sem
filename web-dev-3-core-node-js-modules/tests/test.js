const { expect } = require("chai");

describe("Counter Module", function () {
  let counter;

  beforeEach(function () {
    delete require.cache[require.resolve("../src/index")];
    counter = require("../src/index");
  });

  it("should export the required methods", function () {
    expect(counter.increment).to.be.a("function");
    expect(counter.decrement).to.be.a("function");
    expect(counter.getCount).to.be.a("function");
  });

  it("should initialize counter with 0", function () {
    expect(counter.getCount()).to.equal(0);
  });

  it("should increment the counter", function () {
    counter.increment();
    expect(counter.getCount()).to.equal(1);
  });

  it("should increment multiple times", function () {
    counter.increment();
    counter.increment();
    counter.increment();

    expect(counter.getCount()).to.equal(3);
  });

  it("should decrement the counter", function () {
    counter.increment();
    counter.increment();

    counter.decrement();

    expect(counter.getCount()).to.equal(1);
  });

  it("should allow negative values", function () {
    counter.decrement();

    expect(counter.getCount()).to.equal(-1);
  });

  it("should not expose the internal counter", function () {
    expect(counter.count).to.equal(undefined);
  });

  it("should ignore direct modification of counter", function () {
    counter.count = 100;

    expect(counter.getCount()).to.equal(0);
  });

  it("should return a number", function () {
    expect(counter.getCount()).to.be.a("number");
  });
});

