/**
 * @fileoverview manager for the Box Relay Resource
 */

 'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
var urlPath = require('../util/url-path'),
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
function Workflow(client) {
	this.client = client;
}

Workflow.prototype.getAll = function(callback) {

    var query = gql`
        { 
            templates (first: 3) { 
                items { 
                    id name 
                } 
            } 
        }`

    var parsedQuery = JSON.parse(query());

    var param = {
        body: parsedQuery,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return this.client.wrapWithDefaultHandler(this.client.post)(URL_PATH, param, callback)
};

module.exports = Workflow;
