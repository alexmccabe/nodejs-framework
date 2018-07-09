const csrf = require('csurf');

module.exports = app => {
    if (
        !process.env.DISABLE_CSRF ||
        process.env.DISABLE_CSRF.toLowerCase() !== 'true'
    ) {
        app.use(csrf({ cookie: true }));
        app.use(function(req, res, next) {
            res.header('X-CSRF-Token', req.csrfToken());
            next();
        });
    }
};
