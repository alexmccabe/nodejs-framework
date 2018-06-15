const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

module.exports = app => {
    app.use((req, res, next) => {
        // const origin = req.headers.origin;
        // const allowedOrigins = config.get('allowedOrigins');

        // if (allowedOrigins.indexOf(origin) > -1) {
        //     res.setHeader('Access-Control-Allow-Origin', origin);
        // }
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );

        // Request headers you wish to allow
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With,content-type'
        );

        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.use(express.static('public'));
    app.use(
        bodyParser.json({
            limit: '50mb'
        })
    );

    fs.readdirSync(__dirname).forEach(fileName => {
        const filePath = `${__dirname}/${fileName}`;
        const route = fileName.split('.')[0];

        if (fileName === 'index.js' || fs.lstatSync(filePath).isDirectory()) {
            return;
        }

        if (route !== 'root') {
            app.use(`/${route}`, require(filePath));
        } else {
            app.use('/', require(filePath));
        }
    });
};
