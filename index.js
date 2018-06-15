require('module-alias/register');
const chalk = require('chalk');

const app = require('@/app');
const server = require('@/server');

app.set('port', process.env.PORT || 5000);

server.listen(app, app.get('port')).then(port => {
    console.log('');
    console.log(
        chalk.bgBlue.black(' Server listening on port: '),
        chalk.blue(port)
    );
});
