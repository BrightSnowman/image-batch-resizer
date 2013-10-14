/*
 * imageprocessor
 * https://github.com/brightsnowman/imageprocessor
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

var fs = require('fs');
var util = require('util');


/**
 * Copies a given file asynchronously to a given target.
 * After the file has been copied, or an error occured, the function
 * will call a given callback function.
 *
 * Hint: The function will not override any existing file. If
 * the target already exists, it will return immediately calling
 * the callback function.
 * 
 * @param {string} source A string representing the file path 
 * (absolute or relative) of the file to be copied.
 * @param {string} target A string representing the path where the 
 * file shall be copied to.
 * @param {Function} callback A callback function that will be called
 * after the file has been copied, or an error occured. The callback
 * has to check two parameters: The first one will indicate whether
 * an error occured (node error object) or not (undefined). The second
 * parameter will be the file that has been successfully created (see
 * target parameter).
 */
function copyFile(source, target, callback) {
	// Don't overwrite any files
	if (fs.existsSync(target)) {
		callback(false, target);
		return;
	}

	var cbCalled = false;

	var rs = fs.createReadStream(source);
	rs.on("error", function (err) {
  	done(err);
	});

	var ws = fs.createWriteStream(target);
	ws.on("error", function (err) {
  	done(err);
	});
	ws.on("close", function (ex) {
  	done();
	});
	rs.pipe(ws);

	function done(err) {
  	if (!cbCalled) {
  		callback(err, target);
  		cbCalled = true;
  	}
	}
}

/**
 * Gets the file name from a given complete path.
 *
 * Example:
 * console.log(getFileNameFromCompletePath('/path/to/file.jpg'));
 * 'file.jpg'

 * @param {string} file A string representing a file path.
 * 
 * @return {string} The file name including its extension defined
 * by the given complete path.
 */
function getFileNameFromCompletePath(file) {
  return file.replace(/^.*(\\|\/|\:)/, '');
}

/**
 * Gets the extension of a given file name.
 *
 * Example:
 * console.log(getFileExtensionFromFile('file.jpg'));
 * 'jpg'
 * 
 * @param {string} file A given file name including its extension.
 * 
 * @return {string} The extension of the file.
 */
function getFileExtensionFromFile(file) {
  var pos = file.lastIndexOf('.'); 
  return pos !== -1 ? file.substr(pos + 1) : '';
}

/**
 * Gets the file name without its extension.
 *
 * Example:
 * console.log(getFileExtensionFromFile('file.jpg'));
 * 'file'
 * 
 * @param {string} file A file name including its extension.
 * @return {string} Returns only the name of the file, excluding
 * its extension.
 */
function getFileNameWithoutExtension(file) {
  var pos = file.lastIndexOf('.');
  return pos !== -1 ? file.substr(0, pos) : file;
}

/**
 * Gets an Array of file names contained in a given directory 
 * synchronously.
 * 
 * You can also call this function with a file instead of a
 * directory, which will only cause the function to return the
 * given file in an array containing only this file. This way,
 * you don't have to check whether a file is a directory or a
 * file.
 *
 * Example 1:
 * console.log(getFileExtensionFromFile('file.jpg'));
 * ['file.jpg']
 *
 * Example 2:
 * console.log(getFileExtensionFromFile('dir'));
 * ['file1.ext', 'file2.ext']
 * 
 * @param {Array} directories An array of strings representing a 
 * directory path (or a file).
 * @return {Array} An Array representing the files in the given
 * directory.
 */
function getFilesFromDirectory(directories) {
  var countInputs = directories.length;
  var filesToBeProcessed = [];

  for (var i = 0; i < countInputs; ++i) {
    var inputFile = directories[i];
    if (!fs.existsSync(inputFile)) {
      util.error('Input file does not exist', inputFile);
      continue;
    }

    var stats = fs.statSync(inputFile);
    if (stats.isDirectory()) {
      var files = fs.readdirSync(inputFile);

      if (!files) {
        continue;
      }

      var dirFilesLength = files.length;
      for (var j = 0; j < dirFilesLength; ++j) {
        filesToBeProcessed.push(inputFile + 
            (inputFile.charAt(inputFile.length - 1) === '/' ? '' : '/') + 
            files[j]);
      }
    } else {
      filesToBeProcessed.push(inputFile);
    } 
  }

  return filesToBeProcessed;
}

module.exports = {
  copyFile: copyFile, 
  getFileNameFromCompletePath: getFileNameFromCompletePath,
  getFileExtensionFromFile: getFileExtensionFromFile,
  getFileNameWithoutExtension: getFileNameWithoutExtension,
  getFilesFromDirectory: getFilesFromDirectory
}