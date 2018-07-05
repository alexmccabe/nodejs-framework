const config = require('config');

/**
 * Take the given origin and check whether it is allowed based on the
 * app.allowedOrigins config.
 *
 * Allowed origins can be an array of origins, a string of a single origin
 * or '*'.
 * @param {String} origin Origin of request
 */
module.exports = origin => {
    const allowedOrigins = config.get('app.allowedOrigins');

    if (allowedOrigins.length) {
        if (
            (allowedOrigins.constructor === Array &&
                allowedOrigins.indexOf(origin) > -1) ||
            (allowedOrigins.constructor === String &&
                allowedOrigins === origin) ||
            (allowedOrigins.constructor === String && allowedOrigins === '*')
        ) {
            return true;
        }
    }

    return false;
};
