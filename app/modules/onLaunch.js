// const { getAvailablePort } = require('@/app/utilities');
const config = require('config');
const fs = require('fs');
const path = require('path');

/**
 * Run things once on launch of the application.
 * This runs on master before any of the threads have been forked.
 */
module.exports = async () => {
    if (process.env.NODE_ENV !== 'production') {
        const logDir = path.join(__dirname, '..', config.app.paths.logDir);

        fs.access(logDir, fs.constants.F_OK, err => {
            if (err) {
                fs.mkdir(logDir, err => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
        //     await getAvailablePort(process.env.PORT).then(
        //         port => {
        //             return port;
        //         }
        //     );
    }
};
