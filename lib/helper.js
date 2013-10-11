/*
 * imageprocessor
 * https://github.com/brightsnowman/imageprocessor
 *
 * Copyright (c) 2013 Alexander Kohout
 * Licensed under the MIT license.
 */

/**
 * Checks whether a given object is numeric or not.
 * 
 * @param {*} number A potential numeric value.
 * 
 * @return {Boolean} Returns true, if the given value is numeric or can
 * be transformed to a numeric value (using parseInt for example).
 */
function isNumber(number) {
	return /^\d+$/.test(number);
}

/**
 * Gets the smaller of two given numbers.
 * 
 * @param {numeric} number1 The first number.
 * @param {numeric} number2 The second number.
 * 
 * @return {numeric} Returns the smaller of both numeric values.
 */
function getMinimumOfTwoNumbers(number1, number2) {
  return number1 >= number2 ? number2 : number1;
}

/**
 * Gets an image object with width and height from a YxZ string.
 *
 * Example:
 * console.log(getImageSizesFromCrossStrings("250x200"));
 * "{ width: 250, height: 200 }"
 * 
 * @param {Array} rawSizes An Array of strings, where each string describes 
 * the two room dimensions width and height with the pattern YxZ, where Y and Z must
 * be replaced by a numeric value.
 * 
 * @return {Array} Returns an array ob image objects, where each object
 * contains a width and a height property. The returned objects take
 * the according information from the input array.
 */
function getImageSizesFromCrossStrings(rawSizes) {
  var sizesLength = rawSizes.length;
  var imageSizes = [];
  for (var i = 0; i < sizesLength; ++i) {
    var sizes = rawSizes[i].split('x');
    if (rawSizes[i].indexOf('x') === -1 || sizes.length !== 2 || 
        !isNumber(sizes[0]) || !isNumber(sizes[1])) {
      console.error('Size has an incorrect format, must be in DxD', rawSizes[i]);
      continue;
    }

    imageSizes.push({width: parseInt(sizes[0]), height: parseInt(sizes[1])});
  }

  return imageSizes;
}

module.exports = {
  isNumber: isNumber,
  getMinimumOfTwoNumbers: getMinimumOfTwoNumbers,
  getImageSizesFromCrossStrings: getImageSizesFromCrossStrings
}