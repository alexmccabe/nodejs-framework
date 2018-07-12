const chalk = require('chalk');
const express = require('express');
const config = require('config');

require('@/app/models/User');
require('@/config/passport');
require('@/config/aws')();

const app = express();
const db = require('@/app/database/mongodb');
const { appPath, basePath } = require('@/app/utilities').paths;
const { errorHandler } = require('./errorHandlers');

function start() {
    const templateEngine = process.env.TEMPLATE_ENGINE;
    app.set('basePath', basePath());
    app.set('appPath', appPath());
    app.set('views', basePath() + config.app.paths.templateDir);
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
        console.log(
            chalk.bgBlue.black(' Server listening on port: '),
            chalk.blue(process.env.PORT)
        );
    });
}

function handleDbError(err) {
    if (!err.code) {
        console.error(
            chalk.bgRed.black(' Could not connect to db: '),
            chalk.red(process.env.MONGODB_URI)
        );
    }
    console.log('');
    console.log(chalk.bgRed.black(` ${err} `));
    process.exit(0);
}

function handleDbSuccess() {
    console.log('');
    console.log(
        chalk.bgCyan.black(' Successfully connected to db: '),
        chalk.cyan(process.env.MONGODB_URI)
    );
    console.log('');

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
