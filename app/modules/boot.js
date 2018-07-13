const chalk = require('chalk');
const express = require('express');
const config = require('config');
const ip = require('ip');
const path = require('path');

require('@/app/models/User');
require('@/config/passport');
require('@/config/aws')();

const app = express();
const db = require('@/app/database/mongodb');
const { errorHandler } = require('./errorHandlers');
const {
    appPath,
    basePath,
    logPath,
    staticAssetPath,
    tmpPath
} = require('@/app/utilities').paths;

function logSuccess() {
    console.log(' ');
    console.log(
        chalk.bgBlue.black(
            ' Successfully started server, you can now start making requests '
        )
    );
    console.log(' ');

    if (
        process.env.NODE_ENV === 'dev' ||
        process.env.NODE_ENV === 'development'
    ) {
        console.log(
            chalk.bold.blue('            Locally:'),
            chalk.blue('http://localhost:') + chalk.bold.blue(process.env.PORT)
        );
        console.log(
            chalk.bold.blue('    On Your Network:'),
            chalk.blue(`http://${ip.address()}:`) +
                chalk.bold.blue(process.env.PORT)
        );
        console.log(' ');
    }
}

function start() {
    const templateEngine = process.env.TEMPLATE_ENGINE;
    app.set('basePath', basePath());
    app.set('appPath', appPath());
    app.set('views', path.join(basePath(), config.app.paths.templateDir));
    app.set('logPath', logPath());
    app.set('staticAssetPath', staticAssetPath());
    app.set('tmpPath', tmpPath());
    app.set('trust proxy', 1);

    if (
        templateEngine &&
        templateEngine.length &&
        templateEngine.toLowerCase() !== 'html'
    ) {
        app.set('view engine', templateEngine);
    } else {
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
    }

    require('@/app/routes')(app);

    app.use(errorHandler);

    app.listen(process.env.PORT, function() {
        logSuccess();
    });
}

function handleDbError(err) {
    console.log(' ');

    if (!err.code) {
        console.error(
            chalk.bgRed.black(' Could not connect to db: '),
            chalk.red(process.env.MONGODB_URI)
        );
        console.log(' ');
    }
    console.log(chalk.bgRed.black(` ${err} `));
    console.log(' ');
    process.exit(0);
}

function handleDbSuccess() {
    start();
}

module.exports = () => {
    if (process.env.MONGODB_URI) {
        db.connect(
            process.env.MONGODB_URI,
            config.mongoDB
        )
            .catch(err => handleDbError(err))
            .then(() => handleDbSuccess());
    } else {
        start();
    }
};
