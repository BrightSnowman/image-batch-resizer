#! /usr/bin/env node

/*
 * imageprocessor
 * https://github.com/brightsnowman/imageprocessor
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var util = require('util');

var rimraf = require('rimraf');

var fileHandling = require('./fileHandling');
var helper = require('./helper');
var image = require('./image');

// Configure Command Line Usage
var argv = require('optimist')
  .usage('Process images easily by running \n \
  	$0 --size 30x30 [--size 40x30] --input FILE1 [--input FILE2 ..] --output DIR')
  .demand(['input', 'output', 'size'])
  .alias('i', 'input')
  .describe('i', 'A list of files or directories to be processed')
  .alias('o', 'output')
  .describe('o', 'A directory where to put the processed images')
  .alias('s', 'size')
  .describe('s', 'The target size of the image in format DxD, with D for an integer value')
  .boolean('clearOutput')
  .alias('c', 'clearOutput')
  .argv;

var main = function(){
  util.log('Starting image resize');

  // Make sure argv.size and argv.input are arrays
  if (!util.isArray(argv.size)) {
    argv.size = [argv.size];
  }

  if (!util.isArray(argv.input)) {
    argv.input = [argv.input];
  }

  // Create root output directory (if it does not exist)
  var outputDir = argv.output + 
				        (argv.output.charAt(argv.output.length - 1) === '/' ? '' : '/');

  // Delete the output directory if command is set
  if (fs.existsSync(outputDir) && argv.clearOutput) {
    rimraf.sync(outputDir);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  var filesToBeProcessed = fileHandling.getFilesFromDirectory(argv.input);
  var inputFilesLength = filesToBeProcessed.length;

  var targetSizes = helper.getImageSizesFromCrossStrings(argv.size);
  var targetSizeLength = targetSizes.length;

  // The map will be used to align files with output directories.
  // This deals with the asynchronous nature of the copyFile function
  // so that in the callback called by copyFile we know where the output
  // should go
  var destinationDirectoryMap = {};

  // The variable is used for monitoring the progress
  var countOfResizeReturns = 0;

  var countOfTotalLoopRuns = inputFilesLength * targetSizeLength;
  util.log(inputFilesLength + ' will be resized to ' + targetSizeLength + 
          ' different sizes = ' + countOfTotalLoopRuns);

  var ORIGINAL_FILE_NAME = 'original';
  for (var i = 0; i < inputFilesLength; ++i) {

    // Get file name, extension and therewith destination directory
    // where the output will go to
    var fileNameWithExtension = fileHandling.getFileNameFromCompletePath(filesToBeProcessed[i]);
    var fileExtension = fileHandling.getFileExtensionFromFile(fileNameWithExtension);
    var fileName = fileHandling.getFileNameWithoutExtension(fileNameWithExtension);
    var destinationDir = outputDir + fileName;

    // Prepare output directory for resized images
    if (!fs.existsSync(destinationDir)) {
		  fs.mkdirSync(destinationDir);
    }
		
    var targetCopiedFile = destinationDir + '/' + 
						                ORIGINAL_FILE_NAME + '.' + fileExtension;

    // Remember destination directory for copy file callback
    destinationDirectoryMap[targetCopiedFile] = destinationDir;
    fileHandling.copyFile(filesToBeProcessed[i], targetCopiedFile, 
      function (error, file) {
		    if (error) {
		      util.error('Copying file did not work');

          // We also count the ones that hasn't been resized
          countOfResizeReturns++; 

		      return;
	      }
		
        // For all sizes call the size function with size, file, targetFile

        // Only display the progress every 5 percent
        var PROGESS_STEP_SIZE = 5;
        var nextProgressBorder = PROGESS_STEP_SIZE;

		    for (var j = 0; j < targetSizeLength; ++j) {
		      var targetFileName = destinationDirectoryMap[file] + '/' + 
              								targetSizes[j].width + 
              								'x' + targetSizes[j].height + '.' + 
              								fileHandling.getFileExtensionFromFile(file);

		      image.resize(file, targetFileName, targetSizes[j], function () {
            countOfResizeReturns++;

            var progress = (countOfResizeReturns / countOfTotalLoopRuns) * 100;
            if (progress > nextProgressBorder) {
              util.log('Progress: ' + Math.round(progress) + '%');
              nextProgressBorder += PROGESS_STEP_SIZE;
            }
          });
		    }
    });
  }
}

// Only perform action if run directly
if (require.main === module) {
  main();
}
