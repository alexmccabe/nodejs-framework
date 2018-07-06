const bodyParser = require('body-parser');
const config = require('config');
const cookieParser = require('cookie-parser');
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

const { setSecurityHeaders, setHeaders } = require('./setHeaders');

module.exports = app => {
    app.use(cookieParser());
    app.use(
        session({
            secret: process.env.COOKIE_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: { secure: false },
            store
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    setSecurityHeaders(app);

    app.use((res, req, next) => setHeaders(res, req, next));
    app.use(express.static(config.app.paths.staticAssetDir || 'public'));

    app.use(bodyParser.urlencoded(config.get('bodyParser.urlencoded')));
    app.use(bodyParser.json(config.get('bodyParser.json')));
};
