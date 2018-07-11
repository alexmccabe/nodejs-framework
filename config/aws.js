const AWS = require('aws-sdk');
const config = require('config');
const logger = require('@/config/winston');

module.exports = () => {
    const accessKey = process.env.AWS_ACCESS_KEY_ID;
    const accessSecret = process.env.AWS_SECRET_ACCESS_KEY;

    if (accessKey || accessSecret) {
        const awsConfig = config.cdn.config.aws || {};

        const awsGlobalConfig = new AWS.Config({
            accessKeyId: accessKey,
            secretAccessKey: accessSecret,
            ...awsConfig
        });

        if (awsConfig.usePromise) {
            AWS.config.setPromisesDependency(global.Promise);
        }

        return awsGlobalConfig;
    }
};
