/**
 * Detect whether the incoming request is is a valid XHR request. It does this
 * in one of two ways, first it checks whether Node reports the `xhr` property
 * on the `req` object. This is usually set by most AJAX request libraries.
 * If this fails, it will check to make sure that there is an
 * `Accept: application/json` header.
 *
 * If neither of these headers are available, it will return a 415 status to the
 * requester.
 *
 * It will only perform these checks if the method is not an `OPTIONS` request.
 * @param {Object} req Node request object
 * @param {Object} res Node response object
 * @param {Function} next Node next callback
 */
module.exports = (req, res, next) => {
    const isXHR = req.xhr;
    const accept =
        req.headers.accept && req.headers.accept.indexOf('json') > -1;

    /**
     * If it is an OPTIONS request, just continue. OPTIONS does not send the
     * required headers. We also make sure that Node reports XHR, or the correct
     * accept header is present.
     */
    if (req.method === 'OPTIONS' || (isXHR || accept)) {
        return next();
    }

    return res.status(415).json({
        errors: [
            {
                message:
                    'The /api endpoint can only be accessed via an XHR request.',
                description: [
                    'To resolve this issue send either the',
                    '"X-Requested-With": "XMLHttpRequest" or',
                    '"Accept: application/json" header.'
                ].join('')
            }
        ]
    });
};
