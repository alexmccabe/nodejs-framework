const chalk = require('chalk');
const Redis = require('redis');
const url = require('url');
const { DatabaseConnectionError } = require('@/app/modules/errors');

module.exports = {
    connect(redisUrl) {
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
                url: redisUrl
            });

            client.on('error', err => {
                return reject(new DatabaseConnectionError(err));
            });

            client.on('connect', () => {
                const uriParts = url.parse(redisUrl);

                console.log(' ');
                console.log(
                    chalk.bgCyan.black(' Successfully connected to Redis ')
                );
                console.log(' ');
                console.log(
                    '    ' +
                        (uriParts.pathname ? '    ' : '') +
                        chalk.bold.cyan('Host:'),
                    chalk.cyan(uriParts.host)
                );
                uriParts.pathname
                    ? console.log(
                          chalk.cyan(
                              'Database: ' + uriParts.pathname.replace('/', '')
                          )
                      )
                    : null;
                console.log(' ');

                return resolve(client);
            });

            client.on('end', () => {
                console.log(' ');
                console.log(chalk.bgRed.black(' Disconnected from Redis '));
                console.log(' ');
            });
        });
    }
};
