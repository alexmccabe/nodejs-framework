require('module-alias/register');

const cluster = require('cluster');
const config = require('config');
const path = require('path');
const fs = require('fs');

if (cluster.isMaster) {
    const { getCpuCount } = require('@/app/utilities');
    const scriptPath = path.join(__dirname, config.app.paths.masterScript);

    fs.access(scriptPath, fs.constants.F_OK, err => {
        if (!err) {
            require(scriptPath)();
        }
    });

    for (let i = 0; i < getCpuCount(); i += 1) {
        cluster.fork();
    }
} else {
    const scriptPath = path.join(__dirname, config.app.paths.threadScript);

    fs.access(scriptPath, fs.constants.F_OK, err => {
        if (!err) {
            require(scriptPath)(cluster.worker.id);
        }
    });
}

cluster.on('exit', worker => {
    if (process.env.NODE_ENV === 'production') {
        console.log('Worker %d died, restarting...', worker.id);
        return cluster.fork();
    }
});
