const chalk = require('chalk');
const config = require('config');
const mongoose = require('mongoose');
const url = require('url');

function logSuccess(uri) {
    const uriParts = url.parse(uri);

    console.log(' ');
    console.log(chalk.bgCyan.black(' Successfully connected to MongoDB '));
    console.log(' ');
    console.log(
        '    ' + (uriParts.pathname ? '    ' : '') + chalk.bold.cyan('Host:'),
        chalk.cyan(uriParts.host)
    );

    uriParts.pathname
        ? console.log(
              chalk.bold.cyan('    Database:'),
              chalk.cyan(uriParts.pathname.replace('/', ''))
          )
        : null;
    console.log(' ');
}

mongoose.connection.on('disconnected', function() {
    console.log(' ');
    console.log(chalk.bgRed.black(' Disconnected from MongoDB '));
    console.log(' ');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log(
            chalk.yellow(
                'MongoDB connection disconnected through app termination'
            )
        );
        console.log(' ');

        process.exit(0);
    });
});

module.exports = {
    connect(mongoURI) {
        return new Promise((resolve, reject) => {
            mongoose
                .connect(
                    mongoURI,
                    config.mongoDB || {}
                )
                .then(() => {
                    logSuccess(mongoURI);

                    resolve();
                })
                .catch(err => reject(err));
        });
    },

    disconnect(cb = () => {}) {
        mongoose.connection.close(cb());
    }
};
