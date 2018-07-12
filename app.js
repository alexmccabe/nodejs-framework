// const cluster = require('cluster');
const chalk = require('chalk');
const config = require('config');
const path = require('path');
const PrettyError = require('pretty-error');
const fs = require('fs');
const pe = new PrettyError();

require('module-alias/register');

if (!config.has('app.paths.bootScript')) {
    console.log(' ');
    console.log(
        chalk.bgRed.black(
            ' No launch script path specified, application will now exit. '
        )
    );
    console.log(' ');

    process.exit(0);
}

const scriptPath = path.join(__dirname, config.app.paths.bootScript);

fs.access(scriptPath, fs.constants.F_OK, err => {
    if (err) {
        return console.log(pe.render(new Error(err)));
    }

    require(scriptPath)(process.env.INSTANCE_ID);
});
