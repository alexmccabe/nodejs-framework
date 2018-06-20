module.exports = () => {
    return process.env.NODE_ENV === 'production'
        ? process.env.WEB_CONCURRENCY || require('os').cpus().length
        : 1;
};
