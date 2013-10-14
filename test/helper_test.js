'use strict';

var h = require('../lib/helper.js');

exports.testIsNumber = function (test) {
  test.expect(4);
    
  test.ok(h.isNumber(2));
  test.ok(h.isNumber('1337'));
  test.ok(! h.isNumber('blubb'));
  test.ok(! h.isNumber(3.7));

  test.done();
};

exports.testGetMinimumOfTwoNumbers = function (test) {
  test.expect(2);

  test.equal(h.getMinimumOfTwoNumbers(5,6), 5);
  test.equal(h.getMinimumOfTwoNumbers(1337, 1337), 1337);

  test.done();
};

exports.testGetImageSizesFromCrossStrings = function (test) {
  test.expect(4);

  var sizes = h.getImageSizesFromCrossStrings(['30x40', '1x3000']);
  test.equal(sizes[0].width, 30);
  test.equal(sizes[0].height, 40);
  test.equal(sizes[1].width, 1);
  test.equal(sizes[1].height, 3000);

  test.done();
};