const portfinder = require('portfinder');

exports.listen = (app, defaultPort = 5000) => {
    portfinder.basePort = parseInt(defaultPort, 10);

    // if (process.env.NODE_ENV === 'production') {
    app.listen(defaultPort);
    return Promise.resolve(defaultPort);
    // }

    // return portfinder
    //     .getPortPromise()
    //     .then(port => {
    //         app.listen(port);
    //         return port;
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
};
