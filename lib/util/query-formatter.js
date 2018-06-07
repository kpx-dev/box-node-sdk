/**
 * @fileoverview Query formatter to remove comma separated values.
 */

'use strict';


// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * remove commas from a string. This is useful for constructing a qraphql query from
 * the options.fields parameter passed into a function.
 * 
 * @param {string} fields the comma separated fields value
 * @returns {string} The updated string with commas replaced by a space
 */
module.exports = function queryFormatter(fields) {
    console.log('Inside Util Function', fields);
    var updatedFieldsString;
    updatedFieldsString = fields.replace(/,/g, ' ');
	return updatedFieldsString;
};
