'use strict';

var fs = require('fs');

var fh = require('../lib/fileHandling.js');

exports.testGetFileExtensionFromFile = function (test) {
    test.expect(3);
    
    var testFile1 = 'blubb.jpg';
    test.equal(fh.getFileExtensionFromFile(testFile1), 'jpg');

    var testFile2 = 'bla.blubb.huhu.JPG';
    test.equal(fh.getFileExtensionFromFile(testFile2), 'JPG');

    var testFile3 = 'stringwithoutextension';
    test.equal(fh.getFileExtensionFromFile(testFile3), '');    

    test.done();
};

exports.testGetFileNameFromCompletePath = function (test) {
  test.expect(5);

  var absolutePath = '/path/to/file.ext';
  test.equal(fh.getFileNameFromCompletePath(absolutePath), 'file.ext');

  var relativePath = 'path/to/file.ext';
  test.equal(fh.getFileNameFromCompletePath(relativePath), 'file.ext'); 

  var relativePath2 = '../path/to/file';
  test.equal(fh.getFileNameFromCompletePath(relativePath2), 'file');

  var filePath = 'file';
  test.equal(fh.getFileNameFromCompletePath(filePath), 'file');

  var emptyPath = '';
  test.equal(fh.getFileNameFromCompletePath(emptyPath), '');

  test.done();
};

exports.testGetFileNameWithoutExtension = function (test) {
  test.expect(5);

  var fileWithExt = 'file.ext';
  test.equal(fh.getFileNameWithoutExtension(fileWithExt), 'file');

  var fileWithoutExt = 'file';
  test.equal(fh.getFileNameWithoutExtension(fileWithoutExt), 'file');

  var fileWithPath = '/path/to/file.ext';
  test.equal(fh.getFileNameWithoutExtension(fileWithPath), '/path/to/file');

  var fileWithPath2 = '/path/to/file';
  test.equal(fh.getFileNameWithoutExtension(fileWithPath), '/path/to/file');

  var emptyStr = '';
  test.equal(fh.getFileNameWithoutExtension(emptyStr), '');

  test.done();
};

exports.testGetFilesFromDirectory = function (test) {
  test.expect(6);

  var sampleDir = __dirname + '/../example_images';
  var filesInSampleDir = fh.getFilesFromDirectory([sampleDir]);

  console.log(filesInSampleDir[0]);
  test.ok(filesInSampleDir[0].indexOf('pic_1344679313_2.jpg') >= 0);
  test.ok(filesInSampleDir[1].indexOf('pulp_fiction (1).jpg') >= 0);
  test.ok(filesInSampleDir[2].indexOf('pulp_fiction.jpg') >= 0);
  test.equal(filesInSampleDir.length, 3);

  var testFile = __dirname + '/../example_images/pulp_fiction.jpg';
  var filesInSampleDir2 = fh.getFilesFromDirectory([testFile]);
  test.equal(filesInSampleDir2.length, 1);
  test.ok(filesInSampleDir2[0].indexOf('pulp_fiction.jpg') >= 0);

  test.done();
};

exports.testCopyFile = function (test) {
  test.expect(2);

  var sourceFile = __dirname + '/../example_images/pulp_fiction.jpg';
  var target = __dirname + '/testCopy.jpg';

  test.ok(!fs.existsSync(target));

  fh.copyFile(sourceFile, target, function () {
    test.ok(fs.existsSync(target));

    // Remove file
    fs.unlinkSync(target);

    test.done();
  });
};
