function errTest () {
  var arg = Array.prototype.slice.call( arguments )
    , fn  = arg.shift()  // first arg
    , msg = arg.pop() // last arg
    , exp = arg.pop() // second to last arg
    , res
    ;
  try {
    res = fn.apply( pv, arg );
  }
  catch ( err ) {
    res = "Error: " + err.message;
  }
  finally {
    deepEqual( res, exp, msg );
  }
}

test("pv.deviation", function () {

  ok( typeof pv.deviation === 'function', 'pv.deviation is a function' );
  ok( isNaN( pv.deviation([]) ), "([])" );
  ok( isNaN( pv.deviation([Infinity]) ), "([Infinity])" );
  ok( isNaN( pv.deviation([-Infinity]) ), "([-Infinity])" );
  ok( isNaN( pv.deviation([1, Infinity]) ), "([1, Infinity])" );
  ok( isNaN( pv.deviation([1, -Infinity]) ), "([1, -Infinity])" );
  ok( isNaN( pv.deviation([NaN]) ), "([NaN])" );
  ok( isNaN( pv.deviation([0, NaN]) ), "([0, NaN])" );
  strictEqual( pv.deviation([0, 0]), 0, "([0, 0])" );
  strictEqual( pv.deviation([0, 1]), 0.7071067811865476, "([0, 1])" );
  strictEqual( pv.deviation([0, 1, 2]), 1, "([0, 1, 2])" );

});
test("pv.log", function () {

  ok( typeof pv.log === 'function', 'pv.log is a function' );
  strictEqual( pv.log(1, 0), 0, "(1, 0)" );
  strictEqual( pv.log(0, 1), -Infinity, "(0, 1)" );
  strictEqual( pv.log(0, 2), -Infinity, "(0, 2)" );
  strictEqual( pv.log(Infinity, 10), Infinity, "(Infinity, 10)" );
  ok( isNaN(pv.log(-Infinity, 10)), "(-Infinity, 10)" );
  ok( isNaN(pv.log(1, 1)), "(1, 1)" );
  ok( isNaN(pv.log(0, 0)), "(0, 0)" );
  ok( isNaN(pv.log(1, NaN)), "(1, NaN)" );
  ok( isNaN(pv.log(NaN, 10)), "(NaN, 10)" );

});
test("pv.logAdjusted", function () {

  ok( typeof pv.logAdjusted === 'function', 'pv.logAdjusted is a function' );
  strictEqual( pv.logAdjusted(1, 0), 0, "(1, 0)" );
  strictEqual( pv.logAdjusted(0, 2), 0, "(0, 2)" );
  ok( isNaN(pv.logAdjusted(0, 1)), "(0, 1)" );
  ok( isNaN( pv.logAdjusted(0, 0)), "(0, 0)" );
  strictEqual( pv.logAdjusted(Infinity, 10), Infinity, "(Infinity, 10)" );
  strictEqual( pv.logAdjusted(-Infinity, 10), -Infinity, "(-Infinity, 10)" );
  ok( isNaN( pv.logAdjusted(1, 1)), "(1, 1)" );
  ok( isNaN( pv.logAdjusted(1, NaN)), "(1, NaN)" );
  ok( isNaN( pv.logAdjusted(NaN, 10)), "(NaN, 10)" );

});
test("pv.logCeil", function () {

  ok( typeof pv.logCeil === 'function', 'pv.logCeil is a function' );
  strictEqual( pv.logCeil(1, 0), 1, "(1, 0)" );
  strictEqual( pv.logCeil(0, 2), 0, "(0, 2)" );
  ok( isNaN(pv.logCeil(0, 1)), "(0, 1)" );
  ok( isNaN(pv.logCeil(0, 0)), "(0, 0)" );
  strictEqual( pv.logCeil(Infinity, 10), Infinity, "(Infinity, 10)" );
  strictEqual( pv.logCeil(-Infinity, 10), -Infinity, "(-Infinity, 10)" );
  ok( isNaN(pv.logCeil(1, 1)), "(1, 1)" );
  ok( isNaN(pv.logCeil(1, NaN)), "(1, NaN)" );
  ok( isNaN(pv.logCeil(NaN, 10)), "(NaN, 10)" );

});
test("pv.logFloor", function () {

  ok( typeof pv.logFloor === 'function', 'pv.logFloor is a function' );
  strictEqual( pv.logFloor(1, 0), 1, "(1, 0)" );
  strictEqual( pv.logFloor(0, 2), 0, "(0, 2)" );
  ok( isNaN(pv.logFloor(0, 1)), "(0, 1)" );
  ok( isNaN(pv.logFloor(0, 0)), "(0, 0)" );
  strictEqual( pv.logFloor(Infinity, 10), Infinity, "(Infinity, 10)" );
  strictEqual( pv.logFloor(-Infinity, 10), -Infinity, "(-Infinity, 10)" );
  ok( isNaN(pv.logFloor(1, 1)), "(1, 1)" );
  ok( isNaN(pv.logFloor(1, NaN)), "(1, NaN)" );
  ok( isNaN(pv.logFloor(NaN, 10)), "(NaN, 10)" );

});
test("pv.logSymmetric", function () {

  ok( typeof pv.logSymmetric === 'function', 'pv.logSymmetric is a function' );
  strictEqual( pv.logSymmetric(1, 0), 0, "(1, 0)" );
  strictEqual( pv.logSymmetric(0, 1), 0, "(0, 1)" );
  strictEqual( pv.logSymmetric(0, 2), 0, "(0, 2)" );
  strictEqual( pv.logSymmetric(0, 0), 0, "(0, 0)" );
  strictEqual( pv.logSymmetric(Infinity, 10), Infinity, "(Infinity, 10)" );
  strictEqual( pv.logSymmetric(-Infinity, 10), -Infinity, "(-Infinity, 10)" );
  ok( isNaN(pv.logSymmetric(1, 1)), "(1, 1)" );
  ok( isNaN(pv.logSymmetric(1, NaN)), "(1, NaN)" );
  ok( isNaN(pv.logSymmetric(NaN, 10)), "(NaN, 10)" );


});
test("pv.max", function () {

  ok( typeof pv.max.index === 'function', 'pv.max is a function' );
  strictEqual( pv.max([]), -Infinity, "([])" );
  strictEqual( pv.max([Infinity]), Infinity, "([Infinity])" );
  strictEqual( pv.max([-Infinity]), -Infinity, "([-Infinity])" );
  ok( isNaN(pv.max([NaN])), "([NaN])" );
  ok( isNaN(pv.max([undefined])), "([undefined])" );

});
test("pv.max.index", function () {

  ok( typeof pv.max.index === 'function', 'pv.max.index is a function' );
  strictEqual( pv.max.index([]), -1, "([])" );
  strictEqual( pv.max.index([Infinity]), 0, "([Infinity])" );
  strictEqual( pv.max.index([-Infinity]), 0, "([-Infinity])" );
  strictEqual( pv.max.index([NaN]), 0, "([NaN])" );
  strictEqual( pv.max.index([undefined]), 0, "([undefined])" );

});
test("pv.min", function () {

  ok( typeof pv.min === 'function', 'pv.min is a function' );
  strictEqual( pv.min([]), Infinity, "([])" );
  strictEqual( pv.min([Infinity]), Infinity, "([Infinity])" );
  strictEqual( pv.min([-Infinity]), -Infinity, "([-Infinity])" );
  ok( isNaN(pv.min([NaN])), "([NaN])" );
  ok( isNaN(pv.min([undefined])), "([undefined])" );

});
test("pv.min.index", function () {

  ok( typeof pv.min.index === 'function', 'pv.min.index is a function' );
  strictEqual( pv.min.index([]), -1, "([])" );
  strictEqual( pv.min.index([Infinity]), 0, "([Infinity])" );
  strictEqual( pv.min.index([-Infinity]), 0, "([-Infinity])" );
  strictEqual( pv.min.index([NaN]), 0, "([NaN])" );
  strictEqual( pv.min.index([undefined]), 0, "([undefined])" );

});
test("pv.range", function () {
  var i;
  ok( typeof pv.range === 'function', 'pv.range is a function' );
  deepEqual( pv.range(0), [], "(0)" );
  deepEqual( pv.range(-1), [], "(-1)" );
  deepEqual( pv.range(2), [0,1], "(2)" );
  deepEqual( pv.range(-2, 0), [-2,-1], "(-2, 0)" );
  deepEqual( pv.range(0, 2, -1), [], "(0, 2, -1)" );
  deepEqual( pv.range(2, 0, -1), [2,1], "(2, 0, -1)" );
  deepEqual( pv.range(NaN), [], "(NaN)" );
  deepEqual( pv.range(0, NaN), [], "(0, NaN)" );
  deepEqual( pv.range(-Infinity), [], "(-Infinity)" );
  deepEqual( pv.range(0, 1, NaN), [], "(0, 1, NaN)" );
  deepEqual( pv.range(-1, 1), [-1,0], "(-1, 1)" );
  deepEqual( pv.range(2.4, 14 * .2 + .2, .2), [2.4,2.6,2.8], "(2.4, 14 * .2 + .2, .2)" );
  deepEqual( pv.range(-2.4, -14 * .2 - .2, -.2), [-2.4,-2.6,-2.8], "(-2.4, -14 * .2 - .2, -.2)" );
  deepEqual( pv.range(Infinity, Infinity), [], "(Infinity, Infinity)" );
  deepEqual( pv.range(-Infinity, -Infinity), [], "(-Infinity, -Infinity)" );
  deepEqual( pv.range(Infinity, -Infinity), [], "(Infinity, -Infinity)" );
  deepEqual( pv.range(0, -Infinity), [], "(0, -Infinity)" );
  deepEqual( pv.range(Infinity, 0), [], "(Infinity, 0)" );
  deepEqual( pv.range(Infinity, NaN), [], "(Infinity, NaN)" );
  deepEqual( pv.range(NaN, Infinity), [], "(NaN, Infinity)" );
  deepEqual( pv.range(-Infinity, NaN), [], "(-Infinity, NaN)" );
  deepEqual( pv.range(NaN, -Infinity), [], "(NaN, -Infinity)" );
  errTest( pv.range, Infinity, 'Error: range must be finite', "(Infinity)" );
  errTest( pv.range, -Infinity, Infinity, 'Error: range must be finite', "(-Infinity, Infinity)" );
  errTest( pv.range, 0, Infinity, 'Error: range must be finite', "(0, Infinity)" );
  errTest( pv.range, 10, Infinity, 'Error: range must be finite', "(10, Infinity)" );
  errTest( pv.range, -Infinity, 0, 'Error: range must be finite', "(-Infinity, 0)" );
  errTest( pv.range, 0, 1, 0, 'Error: range must be finite', "(0, 1, 0)" );

});
test("scale-degenerate", function () {

  ok( typeof pv.Scale.linear(0).domain === 'function', 'pv.Scale.linear(0).domain is a function' );
  strictEqual( '' + pv.Scale.linear(0).domain(), '0,0', "(0)" );
  strictEqual( '' + pv.Scale.linear([0]).domain(), '0,0', "([0])" );
  strictEqual( '' + pv.Scale.linear(0, 0).domain(), '0,0', "(0,0)" );
  strictEqual( '' + pv.Scale.linear().domain(), '0,1', "()" );
  strictEqual( '' + pv.Scale.linear([1,0]).domain(), '0,1', "([1,0])" );
  strictEqual( '' + pv.Scale.linear(1,0).domain(), '1,0', "(1,0)" );
  strictEqual( '' + pv.Scale.linear(0,NaN).domain(), '0,NaN', "(0,NaN)" );
  strictEqual( '' + pv.Scale.linear(NaN,0).domain(), 'NaN,0', "(NaN,0)" );
  strictEqual( '' + pv.Scale.linear(NaN,NaN).domain(), 'NaN,NaN', "(NaN,NaN)" );
  strictEqual( '' + pv.Scale.linear([]).domain(), '-Infinity,Infinity', "([])" );
  strictEqual( '' + pv.Scale.linear(-Infinity, Infinity).domain(), '-Infinity,Infinity', "(-Infinity,Infinity)" );

  ok( typeof pv.Scale.linear(0).nice === 'function', 'pv.Scale.linear(0).nice is a function' );

  strictEqual( '' + pv.Scale.linear(0).nice().domain(), '0,0', "(0)" );
  strictEqual( '' + pv.Scale.linear([0]).nice().domain(), '0,0', "([0])" );
  strictEqual( '' + pv.Scale.linear(0, 0).nice().domain(), '0,0', "(0,0)" );
  strictEqual( '' + pv.Scale.linear().nice().domain(), '0,1', "()" );
  strictEqual( '' + pv.Scale.linear([1,0]).nice().domain(), '0,1', "([1,0])" );
  strictEqual( '' + pv.Scale.linear(1,0).nice().domain(), '1,0', "(1,0)" );
  strictEqual( '' + pv.Scale.linear(.9,.1).nice().domain(), '0.9,0.1', "(0.9,0.1)" );
  strictEqual( '' + pv.Scale.linear(.1,.1).nice().domain(), '0.1,0.1', "(0.1,0.1)" );
  strictEqual( '' + pv.Scale.linear(0,NaN).nice().domain(), '0,NaN', "(0,NaN)" );
  strictEqual( '' + pv.Scale.linear(NaN,NaN).nice().domain(), 'NaN,NaN', "(NaN,NaN)" );
  strictEqual( '' + pv.Scale.linear([]).nice().domain(), '-Infinity,Infinity', "([])" );
  strictEqual( '' + pv.Scale.linear(-Infinity, Infinity).nice().domain(), '-Infinity,Infinity', "(-Infinity,Infinity)" );

  function ticks(s) { return s.ticks(3).map(s.tickFormat); }

  strictEqual( '' + ticks(pv.Scale.linear(0)), '0', "(0)" );
  strictEqual( '' + ticks(pv.Scale.linear([0])), '0', "([0])" );
  strictEqual( '' + ticks(pv.Scale.linear(0, 0)), '0', "(0,0)" );
  strictEqual( '' + ticks(pv.Scale.linear()), '0,0.5,1', "()" );
  strictEqual( '' + ticks(pv.Scale.linear([1,0])), '0,0.5,1', "([1,0])" );
  strictEqual( '' + ticks(pv.Scale.linear(1,0)), '1,0.5,0', "(1,0)" );
  strictEqual( '' + ticks(pv.Scale.linear(.9,.1)), '0.8,0.6,0.4,0.2', "(0.9,0.1)" );
  strictEqual( '' + ticks(pv.Scale.linear(.1,.1)), '0.1', "(0.1,0.1)" );
  strictEqual( '' + ticks(pv.Scale.linear(0,NaN)), '0', "(0,NaN)" );
  strictEqual( '' + ticks(pv.Scale.linear(NaN,NaN)), 'NaN', "(NaN,NaN)" );
  strictEqual( '' + ticks(pv.Scale.linear(new Date(0))), '01/01/70', "(new Date(0))" );
  strictEqual( '' + ticks(pv.Scale.linear([])), '-Infinity', "([])" );
  strictEqual( '' + ticks(pv.Scale.linear(-Infinity, Infinity)), '-Infinity', "(-Infinity,Infinity)" );

});
test("pv.sum", function () {

  ok( typeof pv.sum === 'function', 'pv.sum is a function' );

  strictEqual( pv.sum([]), 0, "([])" );
  strictEqual( pv.sum([Infinity]), Infinity, "([Infinity])" );
  strictEqual( pv.sum([-Infinity]), -Infinity, "([-Infinity])" );
  strictEqual( pv.sum([1, Infinity]), Infinity, "([1, Infinity])" );
  strictEqual( pv.sum([1, -Infinity]), -Infinity, "([1, -Infinity])" );
  ok( isNaN(pv.sum([NaN])), "([NaN])" );
  ok( isNaN(pv.sum([0, NaN])), "([0, NaN])" );

});
test("pv.variance", function () {

  ok( typeof pv.variance === 'function', 'pv.variance() is a function' );
  ok( isNaN(pv.variance([])), "([])" );
  strictEqual( pv.variance([Infinity]), 0, "([Infinity])" );
  strictEqual( pv.variance([-Infinity]), 0, "([-Infinity])" );
  ok( isNaN(pv.variance([1, Infinity])), "([1, Infinity])" );
  ok( isNaN(pv.variance([1, -Infinity])), "([1, -Infinity])" );
  strictEqual( pv.variance([NaN]), 0, "([NaN])" );
  ok( isNaN(pv.variance([0, NaN])), "([0, NaN])" );

});
