const express = require('express');
const config = require('config');
const chalk = require('chalk');
const app = express();
const passportConfig = require('@/config/passport');
const db = require('@/database/default');

require('@/routes')(app);

function handleDbError(err) {
    if (!err.code) {
        console.error(
            chalk.bgRed.black(' Could not connect to db: '),
            chalk.red(process.env.MONGODB_URI)
        );
    }
    console.log('');
    console.error(err);
}

function handleDbSuccess() {
    console.log('');
    console.log(
        chalk.bgCyan.black(' Successfully connected to db: '),
        chalk.cyan(process.env.MONGODB_URI)
    );
    console.log('');
}

if (process.env.MONGODB_URI) {
    db.connect(
        process.env.MONGODB_URI,
        config.get('mongoDB')
    )
        .then(() => handleDbSuccess())
        .catch(err => handleDbError(err));
}

module.exports = app;
