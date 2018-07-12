const chalk = require('chalk');
const config = require('config');
const mongoose = require('mongoose');
const url = require('url');

mongoose.connection.on('disconnected', function() {
    console.log(
        chalk.bgRed.black(' Mongoose default connection disconnected ')
    );
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log(
            chalk.yellow(
                'Mongoose default connection disconnected through app termination'
            )
        );
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
                    const uriParts = url.parse(mongoURI);

                    console.log(' ');
                    console.log(
                        chalk.bgCyan.black(
                            ' Successfully connected to MongoDB '
                        )
                    );
                    console.log(chalk.cyan('Host: ' + uriParts.host));
                    console.log(
                        chalk.cyan(
                            'Database: ' + uriParts.pathname.replace('/', '')
                        )
                    );
                    console.log(' ');

                    resolve();
                })
                .catch(err => reject(err));
        });
    },

    disconnect(cb = () => {}) {
        mongoose.connection.close(cb());
    }
};
