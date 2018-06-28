const bodyParser = require('body-parser');
const express = require('express');
const config = require('config');

const { isAllowedOrigin } = require('@/utilities');

/**
 * Set the required headers for the application
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function setHeaders(req, res, next) {
    const origin = req.headers.origin;

    if (isAllowedOrigin(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Content-Type'
    );

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
}

exports.setupGlobalMiddleware = app => {
    app.use((res, req, next) => setHeaders(res, req, next));
    app.use(express.static('public'));

    app.use(bodyParser.urlencoded(config.get('bodyParser.urlencoded')));
    app.use(bodyParser.json(config.get('bodyParser.json')));
};

exports.isXhrRequest = (req, res, next) => {
    const isXHR = req.xhr;
    const accept =
        req.headers.accept && req.headers.accept.indexOf('json') > -1;

    if (req.method === 'OPTIONS' || (isXHR || accept)) {
        return next();
    }

    return res.status(415).json({
        errors: [
            {
                message:
                    'The /api endpoint can only be accessed via an XHR request.',
                description: [
                    'To resolve this issue send either the',
                    '"X-Requested-With": "XMLHttpRequest" or',
                    '"Accept: application/json" header.'
                ].join('')
            }
        ]
    });
};

exports.isAuthorised = (req, res, next) => {
    next();
};

exports.isApiAuthorised = (req, res, next) => {
    next();
};
