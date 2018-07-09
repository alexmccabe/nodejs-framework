module.exports = {
    CSRF: require('./CSRF'),
    isXhrRequest: require('./isXhrRequest'),
    rateLimit: require('./rateLimit'),
    setupGlobalMiddleware: require('./setupGlobalMiddleware'),

    isAuthorised(req, res, next) {
        next();
    },

    isApiAuthorised(req, res, next) {
        next();
    }
};
