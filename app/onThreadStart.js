const chalk = require('chalk');
const express = require('express');
const config = require('config');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

require('@/models/User');
require('@/config/passport');

const app = express();
const db = require('@/database/default');

function start() {
    app.use(express.static('public'));

    require('@/routes')(app);

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

    if (process.env.MONGODB_URI) {
        db.connect(
            process.env.MONGODB_URI,
            config.get('mongoDB')
        )
            .then(() => handleDbSuccess())
            .catch(err => handleDbError(err));
    } else {
        start();
    }
};
