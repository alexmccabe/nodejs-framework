const config = require('config');
const path = require('path');

const paths = {
    basePath() {
        return process.mainModule.paths[0]
            .split('node_modules')[0]
            .slice(0, -1);
    },

    appPath() {
        return path.join(paths.basePath(), '/app');
    },

    staticAssetPath() {
        return path.join(
            paths.basePath(),
            config.app.paths.staticAssetDir || 'public'
        );
    },

    logPath() {
        return path.join(paths.basePath(), config.app.paths.logDir || 'logs');
    },

    tmpPath() {
        return path.join(paths.basePath(), config.app.paths.tmpDir || 'tmp');
    }
};

module.exports = paths;
