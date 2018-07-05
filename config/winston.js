const config = require('config');
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;
const CustomConsoleTransport = require('@/app/modules/winstonTransports/consoleTransport');

const MongoDbTransport = require('winston-mongodb').MongoDB;

const options = {
    file: {
        info: {
            level: 'info',
            filename: `${config.app.paths.logDir}/app.log`,
            handleExceptions: true,
            colorize: false,
            json: true,
            prettyPrint: true,
            timestamp: true
        },

        error: {
            level: 'error',
            filename: `${config.app.paths.logDir}/error.log`,
            handleExceptions: true,
            colorize: false,
            json: true,
            prettyPrint: true,
            timestamp: true
        },

        warning: {
            level: 'warning',
            filename: `${config.app.paths.logDir}/warning.log`,
            handleExceptions: true,
            colorize: false,
            json: true,
            prettyPrint: true,
            timestamp: true
        }
    },

    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: false,
        prettyPrint: true,
        timestamp: true
    },

    mongoDB: {
        info: {
            level: 'info',
            db: process.env.MONGODB_URI,
            collection: 'logs'
        }

        // error: {
        //     level: 'error',
        //     db: process.env.MONGODB_URI,
        //     collection: 'logsError'
        // }
    }
};

const customTransports = [new CustomConsoleTransport(options.console)];

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
    customTransports.push(
        new transports.File(options.file.info),
        new transports.File(options.file.warning),
        new transports.File(options.file.error)
    );
}

if (process.env.ENABLE_MONGODB_LOGGING) {
    customTransports.push(new MongoDbTransport(options.mongoDB.info));
}

const formatError = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

module.exports = createLogger({
    format: combine(timestamp(), formatError),
    transports: customTransports,
    exitOnError: false
});
