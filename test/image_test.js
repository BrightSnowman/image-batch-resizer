'use strict';

var gm = require('gm');
var fs = require('fs');
var i = require('../lib/image.js');

var testFileWithRatioOne = __dirname + '/../example_images/pulp_fiction.jpg';
var testFileWithMoreWidth = __dirname + '/../example_images/pic_1344679313_2.jpg';
var testFileWithMoreHeight = __dirname + '/../example_images/pulp_fiction (1).jpg';

// 945x945 => 100x100
exports.testResizeWith945x945to100x100 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test.jpg';
  var targetSize = { width: 100, height: 100 };
  i.resize(testFileWithRatioOne, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 945x945 => 200x250
exports.testResizeWith945x945to200x250 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test5.jpg';
  var targetSize = { width: 200, height: 250 };
  i.resize(testFileWithRatioOne, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 945x945 => 300x200
exports.testResizeWith945x945to300x200 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test4.jpg';
  var targetSize = { width: 300, height: 200 };
  i.resize(testFileWithRatioOne, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1024x768 => 320x240 (same ratio)
exports.testResizeWith1024x768to320x240 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test2.jpg';
  var targetSize = { width: 320, height: 240 };
  i.resize(testFileWithMoreWidth, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1024x768 => 320x320
exports.testResizeWith1024x768to320x320 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test7.jpg';
  var targetSize = { width: 320, height: 320 };
  i.resize(testFileWithMoreWidth, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1024x768 => 500x300
exports.testResizeWith1024x768to500x300 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test8.jpg';
  var targetSize = { width: 500, height: 300 };
  i.resize(testFileWithMoreWidth, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1024x768 => 200x300
exports.testResizeWith1024x768to500x300 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test9.jpg';
  var targetSize = { width: 200, height: 300 };
  i.resize(testFileWithMoreWidth, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1533x2175 => 3066x4350 (same ratio)
exports.testResizeWith1533x2175to3066x4350 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test3.jpg';
  var targetSize = { width: 3066, height: 4350 };
  i.resize(testFileWithMoreHeight, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1533x2175 => 200x500
exports.testResizeWith1533x2175to200x500 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test10.jpg';
  var targetSize = { width: 200, height: 500 };
  i.resize(testFileWithMoreHeight, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1533x2175 => 200x200
exports.testResizeWith1533x2175to200x200 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test11.jpg';
  var targetSize = { width: 200, height: 200 };
  i.resize(testFileWithMoreHeight, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};

// 1533x2175 => 300x200
exports.testResizeWith1533x2175to300x200 = function (test) {
  test.expect(3);
    
  var targetTestFile = __dirname + '/test12.jpg';
  var targetSize = { width: 300, height: 200 };
  i.resize(testFileWithMoreHeight, targetTestFile, targetSize, function () {
    // Does the file exist? 
    test.ok(fs.existsSync(targetTestFile));

    // Does the file contain the expected sizes?
    gm(targetTestFile).size(function (err, size) {
      test.equal(size.width, targetSize.width);
      test.equal(size.height, targetSize.height);

      fs.unlinkSync(targetTestFile);

      test.done();
    });
  });
};
