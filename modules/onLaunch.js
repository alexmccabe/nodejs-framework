// const { getAvailablePort } = require('@/utilities');

/**
 * Run things once on launch of the application.
 * This runs on master before any of the threads have been forked.
 */
module.exports = async () => {
    // if (process.env.NODE_ENV !== 'production') {
    //     await getAvailablePort(process.env.PORT).then(
    //         port => {
    //             return port;
    //         }
    //     );
    // }
};
