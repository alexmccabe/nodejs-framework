// const fs = require('fs');
const setupMiddleware = require('@/modules/middleware');

module.exports = app => {
    setupMiddleware(app);

    app.use('/', require('./root'));
    app.use('/api', require('./api'));
    app.use('/auth', require('./auth'));

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
