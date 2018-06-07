/**
 * @fileoverview manager for the Box Relay Resource
 */

 'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path'),
    queryFormatter = require('../util/query-formatter'),
    errors = require('../util/errors'),
    gql = require('nanographql');
// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------
var URL_PATH = 'https://publicapi-sandbox.ibmbrsandbox.com/'; 

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'workflow' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Workflows(client) {
	this.client = client;
}

/**
 * Get all available relay templates for the user
 * 
 * @param {Object} [options] Optional parameters 
 * @param {Function} [callback] Passed a collection of relay templates if successful
 * @returns  {Promise<Object>} A promise resolving to the retrieved collection of relay template objects
 */
Workflows.prototype.getAll = function(options, callback) { 
    
    var limit;
    var optionalFieldsString;
    var updatedFieldsString;

    if (options && options.limit) {
        this.limit = options.limit;
    } else {
        this.limit = 100;
    }

    if (options && options.fields) {
        updatedFieldsString = queryFormatter(options.fields);
    } else{
        updatedFieldsString = '';
    }

    //options = {fields: 'id,name,modified_at'}

    var queryString = `
        { 
            templates (first: ${this.limit}) { 
                items { 
                    id name ${updatedFieldsString}
                }
            } 
        }`

    return this.query(queryString);
};

/**
 * Used to retrieve a single relay template by ID
 * 
 * @param {string} templateID - The ID of the relay template
 * @param {Object} [options] - Optional parameters 
 * @param {Function} [callback] - Passed a relay tempalte information if it was acquired successfully
 * @returns {Promise<Object>} A promise resolving to the retrieved relay tempalte object 
 */
Workflows.prototype.getTemplate = function(templateID, options, callback) {

    if (options && options.fields) {
        updatedFieldsString = queryFormatter(options.fields);
    } else{
        updatedFieldsString = '';
    }

    var queryString =  `
    { 
        templates (id: ${templateID}) { 
            items { 
                id name ${updatedFieldsString}
            }
        } 
    }`

    return this.query(queryString);
};

Workflows.prototype.getTemplateInstances = function(templateID, options, callback) {
    var queryString = ``

    return this.query(queryString);
};

/**
 * Sends the query to Box-IBM Relay endpoint. All other queries are also passed from this function.
 * 
 * @param {string} queryString - The query to pass to the Box-IBM Relay endpoint
 * @param {Function} [callback] - Passed the relay information if successful, error otherwise
 * @returns {Promise<Object>} A promise resolving to the relay information 
 */
Workflows.prototype.query = function(queryString, callback) {
    console.log('First Log inside query()', queryString);

    var query = gql(queryString)

    console.log('query', query());

    var parsedQuery = JSON.parse(query());

    var param = {
        body: parsedQuery,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return this.client.wrapWithDefaultHandler(this.client.post)(URL_PATH, param, callback)
};

module.exports = Workflows;
