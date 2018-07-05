const Redis = require('redis');
const { DatabaseConnectionError } = require('@/app/modules/errors');

module.exports = {
    connect() {
        return new Promise((resolve, reject) => {
            if (!process.env.REDIS_URI) {
                return reject(
                    new DatabaseConnectionError(
                        [
                            'Trying to connect to a Redis store with',
                            'no URI provided.',
                            'It could be that the `REDIS_URI` environment',
                            'variable is missing or empty. Please check your',
                            'configuration.'
                        ].join(' ')
                    )
                );
            }

            const client = Redis.createClient({
                url: process.env.REDIS_URI
            });

            client.on('error', err => {
                return reject(new DatabaseConnectionError(err));
            });

            client.on('connect', () => {
                console.log('Connected to Redis server');
                return resolve(client);
            });

            client.on('end', () => {
                console.log('Disconnected from Redis server');
            });
        });
    }
};
