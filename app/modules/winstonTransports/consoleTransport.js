const Transport = require('winston-transport');
const PrettyError = require('pretty-error');
const pe = new PrettyError();

module.exports = class CustomConsoleTransport extends Transport {
    log(info, callback) {
        setImmediate(() => {
            if (info.level === 'error') {
                console.log(pe.render(new Error(info.message)));
            } else {
                console.log(info.message);
            }

            this.emit('logged', info);
        });

        callback();
    }
};
