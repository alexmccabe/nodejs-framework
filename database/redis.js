const Redis = require('redis');

module.exports = {
    connect() {
        if (process.env.REDIS_URI) {
            const client = Redis.createClient({
                url: process.env.REDIS_URI
            });

            client.on('error', function(err) {
                console.log('Error ' + err);
            });

            return client;
        } else {
            throw new Error(
                'Trying to connect to a Redis store with no URI provided'
            );
        }
    }
};
