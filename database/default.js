const chalk = require('chalk');
const mongoose = require('mongoose');

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
    connect(url) {
        return new Promise((resolve, reject) => {
            mongoose
                .connect(url)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    },

    disconnect(cb = () => {}) {
        mongoose.connection.close(cb());
    }
};
