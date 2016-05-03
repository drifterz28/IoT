'use strict';
module.exports = function () {
	if (arguments[0] === undefined || arguments[0] === null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}

	var output = Object(arguments[0]);
	for (var index = 1; index < arguments.length; index++) {
		var source = arguments[index];
		if (source !== undefined && source !== null) {
			for (var nextKey in source) {
				if (source.hasOwnProperty(nextKey)) {
					output[nextKey] = source[nextKey];
				}
			}
		}
	}
	return output;
};
