const paths = {
    basePath() {
        return process.mainModule.paths[0]
            .split('node_modules')[0]
            .slice(0, -1);
    },

    appPath() {
        return paths.basePath() + '/app';
    }
};

module.exports = paths;
