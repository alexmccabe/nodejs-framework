const portfinder = require('portfinder');

module.exports = (port = process.env.PORT) => {
    portfinder.basePort = parseInt(port, 10);

    return portfinder.getPortPromise().catch(err => console.error(err));
};
