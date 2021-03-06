// const fs = require('fs');

const {
    CSRF: addCSRF,
    isApiAuthorised,
    isXhrRequest,
    rateLimit,
    setupGlobalMiddleware: setupMiddleware
} = require('@/app/modules/middleware');

const { errorHandler, notFound } = require('@/app/modules/errorHandlers');

module.exports = app => {
    setupMiddleware(app);

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

    addCSRF(app);
    app.use('/', require('./default'));

    app.use('/auth', require('./auth'));
    app.use('/example', require('./example'));

    app.use(notFound);
    app.use(errorHandler);

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
