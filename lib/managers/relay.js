/**
 * @relayoverview manager for the Box Relay Resource
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
var URL_PATH = 'https://publicapi-sandbox.ibmbrsandbox.com'; 

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Simple manager for interacting with all 'relay' endpoints and actions.
 *
 * @constructor
 * @param {BoxClient} client - The Box API Client that is responsible for making calls to the API
 * @returns {void}
 */
function Relay(client) {
	this.client = client;
}

Relay.prototype.getAll = async function() {
    var query = gql`
        query: {
            templates (first: 3) {
                items {
                    id
                    name
                }
            }
        }
        `
    try {
        var res = await fetch('/query', {
            body: query,
            method: 'POST'
        })
        var json = res.json()
        console.log(json)
    } catch (err) {
        console.error(err)
    }
};


