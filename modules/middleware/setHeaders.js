const config = require('config');
const csp = require('helmet-csp');
const helmet = require('helmet');
const referrerPolicy = require('referrer-policy');

const { isAllowedOrigin } = require('@/utilities');

module.exports = {
    /**
     * Set the required headers for the application
     * @param {Object} req Node request object
     * @param {Object} res Node response object
     * @param {Function} next Node next callback
     */
    setHeaders(req, res, next) {
        const origin = req.headers.origin;

        // Make sure the requesters origin is allowed
        if (isAllowedOrigin(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        // Request methods you wish to allow
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );

        // Request headers you wish to allow
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With,Content-Type'
        );

        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    },

    /**
     * Set security headers if they are not disabled.
     * All controlled via the helmetjs library
     * @param {Object} app Express 'application` object
     * @link https://github.com/helmetjs/helmet
     */
    setSecurityHeaders(app) {
        if (
            !process.env.DISABLE_SECURITY_HTTP_HEADERS ||
            process.env.DISABLE_SECURITY_HTTP_HEADERS.toLowerCase() !== 'true'
        ) {
            app.use(helmet());
        }

        if (
            !process.env.DISABLE_SECURITY_HTTP_CSP ||
            process.env.DISABLE_SECURITY_HTTP_CSP.toLowerCase() !== 'true'
        ) {
            app.use(
                csp(
                    config.has('security.helmetCSP')
                        ? config.get('security.helmetCSP')
                        : { directives: { defaultSrc: ['\'self\''] } }
                )
            );
        }

        if (
            !process.env.DISABLE_HTTP_REFERRER ||
            process.env.DISABLE_HTTP_REFERRER.toLowerCase() !== 'true'
        ) {
            app.use(
                referrerPolicy(
                    config.has('security.referrerPolicy')
                        ? config.get('security.referrerPolicy')
                        : null
                )
            );
        }
    }
};
