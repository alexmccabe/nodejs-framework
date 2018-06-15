require('module-alias/register');

const app = require('@/app');
const server = require('@/server');

app.set('port', process.env.PORT || 5000);

server
    .listen(app, app.get('port'))
    .then(port => console.log('Server listening on port %s', port));
