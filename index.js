require('module-alias/register');
const config = require('config');

const app = require('@/app');
const server = require('@/server');
require('@/routes')(app);

app.set('port', process.env.PORT || 5000);

server
    .listen(app, app.get('port'))
    .then(port => console.log('Server listening on port %s', port));
