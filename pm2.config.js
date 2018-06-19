module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'node-framework',
            script: 'index.js',
            instance_var: 'INSTANCE_ID',
            env: {
                exec_mode: 'cluster_mode',
                instances: 'max',
                node_args: '--require dotenv/config',
                ignore_watch: ['node_modules', 'pm2.config.js'],
                watch: true,
                NODE_ENV: 'dev'
            },
            env_production: {
                watch: false,
                NODE_ENV: 'production'
            }
        }
    ]
};
