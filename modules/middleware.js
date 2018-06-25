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

exports.isJsonRequest = (req, res, next) => {
    if (!req.is('application/json')) {
        return res
            .status(415)
            .send(
                `Expected content type of "application/json", received "${
                    req.headers['content-type']
                }"`
            );
    }

    next();
};

exports.isAuthorised = (req, res, next) => {
    next();
};

exports.isApiAuthorised = (req, res, next) => {
    next();
};
