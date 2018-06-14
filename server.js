const portfinder = require('portfinder');

function listen(app, defaultPort = process.env.PORT || 5000) {
    portfinder.basePort = defaultPort;

    return portfinder
        .getPortPromise()
        .then(port => {
            app.listen(port);
            return port;
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = {
    listen
};
