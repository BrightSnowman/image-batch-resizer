/*
 * imageprocessor
 * https://github.com/brightsnowman/imageprocessor
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

var gm = require('gm');
var util = require('util');
var helper = require('./helper');


/**
 * Resizes a given image and saves it to a new file.
 * 
 * @param {string} sourceFile A path to an image file to be resized.
 * @param {string} targetFileName A path where the resized image should
 * be saved.
 * @param {object} targetSize An object defining the resize dimensions.
 * The object has to contain the properties height and width.
 * @param {Function} callback A callback function that will be called 
 * when resizing is finished - either with an error or successful. The 
 * function will be called with one parameter that will indicate error
 * (true or a node error object) or success (false).
 */
function resizeImage(sourceFile, targetFileName, targetSize, callback) {
	var targetRatio = targetSize.width / targetSize.height;

	gm(sourceFile).size(function (err, sourceSize) {
  	if (err) {
  		util.error('Unable to retrieve picture size of file ' + 
  			sourceFile, err);
      return;
  	}

  	var sourceRatio = sourceSize.width / sourceSize.height;

  	// does the desired ratio match the actual ratio?
  	if (targetRatio === sourceRatio) {
  		gm(sourceFile).resize(targetSize.width, targetSize.height)
  			.write(targetFileName, function (err) {
  				if (err) {
  					util.error('Failed to write resized image to ' + 
  									targetFileName, err);
  				}

          callback();
  			});
  	} else {
  		// Otherwise: Crop the image to get a matching, then resize
  		if (sourceRatio === 1) {
        // If sourceRatio is 1, i.e. height == width, we can easily
        // calculate where to crop the image
  			var cropWidth = targetRatio > 1 ? sourceSize.width : sourceSize.width * targetRatio;
  			var cropHeight = targetRatio > 1 ? sourceSize.height / targetRatio : sourceSize.height;	
  		} else if (sourceRatio < 1) {
        // Otherwise we have to see whether height is higher than width and
        // how the target ratio looks like
  			if (targetRatio === 1) {
	  			var min = helper.getMinimumOfTwoNumbers(sourceSize.width, sourceSize.height);
	  			var cropWidth = min;
	  			var cropHeight = min;
	  		} else {
	  			var cropWidth = sourceSize.width;
	  			var cropHeight = sourceSize.width / targetRatio;	
	  		}	  		
  		} else {
  			if (targetRatio === 1) {
	  			var min = helper.getMinimumOfTwoNumbers(sourceSize.width, sourceSize.height);
	  			var cropWidth = min;
	  			var cropHeight = min;
	  		} else {
	  			var cropWidth = sourceSize.height * targetRatio;
	  			var cropHeight = sourceSize.height;	
	  		}
  		}

  		var topStartPoint = (sourceSize.height / 2) - (cropHeight / 2);
			var leftStartPoint = (sourceSize.width / 2) - (cropWidth / 2);

      // topStartPoint or leftStartPoint are negative if the calculated
      // width/height of the new image is higher than in the original
      // image. In this case we correct this. The '!' parameter in
      // the resize call will do the job for us without looking at the ratio
			if (topStartPoint < 0) {
				cropHeight += 2 * topStartPoint;
				topStartPoint = 0;
			} 

			if (leftStartPoint < 0) {
				cropWidth += 2 * leftStartPoint;
				leftStartPoint = 0;
			}

			gm(sourceFile)
  			.crop(cropWidth, cropHeight, leftStartPoint, topStartPoint)
  			.resize(targetSize.width, targetSize.height, '!')
  			.write(targetFileName, function (err) {
  				if (err) {
  					console.error('Unable to crop image ' + sourceFile, err);
  				}

          callback(err);
  			});
  	}
	});
}

module.exports = {
  resize: resizeImage
}