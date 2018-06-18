require('module-alias/register');
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

require('@/routes')(app);

function boot() {
    const server = require('@/server');

    server.listen(app, app.get('port')).then(port => {
        console.log('');
        console.log(
            chalk.bgBlue.black(' Server listening on port: '),
            chalk.blue(port)
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

    boot();
}

if (process.env.MONGODB_URI) {
    db.connect(
        process.env.MONGODB_URI,
        config.get('mongoDB')
    )
        .then(() => handleDbSuccess())
        .catch(err => handleDbError(err));
} else {
    boot();
}

app.set('port', process.env.PORT || 5000);
