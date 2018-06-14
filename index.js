require('module-alias/register');

const app = require('@/app');
const server = require('@/server');

server
    .listen(app)
    .then(port => console.log('Server listening on port %s', port));
