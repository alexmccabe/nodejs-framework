// const fs = require('fs');
const csrf = require('csurf');

const {
    isApiAuthorised,
    isXhrRequest,
    rateLimit,
    setupGlobalMiddleware: setupMiddleware
} = require('@/modules/middleware');

module.exports = app => {
    setupMiddleware(app);

    app.use('/', require('./default'));
    app.use(
        '/api',
        [
            isXhrRequest,
            isApiAuthorised,
            rateLimit.rateLimitAPIShort,
            rateLimit.rateLimitAPILong
        ],
        require('./api')
    );

    if (
        !process.env.DISABLE_CSRF ||
        process.env.DISABLE_CSRF.toLowerCase() !== 'true'
    ) {
        app.use(csrf({ cookie: true }));
        app.use(function(req, res, next) {
            res.cookie('csrf-token', req.csrfToken());
            next();
        });
    }

    app.use('/auth', require('./auth'));
    app.use('/example', require('./example'));

    // This was used to automatically mount routes, now deprecated
    // fs.readdirSync(__dirname).forEach(fileName => {
    //     const filePath = `${__dirname}/${fileName}`;
    //     const route = fileName.split('.')[0];

    //     if (fileName === 'index.js' || fs.lstatSync(filePath).isDirectory()) {
    //         return;
    //     }

    //     if (route !== 'root') {
    //         app.use(`/${route}`, require(filePath));
    //     } else {
    //         app.use('/', require(filePath));
    //     }
    // });
};
