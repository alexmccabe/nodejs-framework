const argv = require('yargs').argv;
const chalk = require('chalk');

console.log('');
console.log(chalk.yellow('Generating key...'));

const length = argv.length || 20;
const parts = [];
const possible =
    '!@#$%^&*()_+~`|}{[]:;?><,./-=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

for (let i = 0; i < length; i += 1) {
    parts.push(possible.charAt(Math.floor(Math.random() * possible.length)));
}

console.log('');
console.log(chalk.bgGreen.black(' Your key: '), chalk.green(parts.join('')));
console.log('');
