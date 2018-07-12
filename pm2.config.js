const ignoreWatchDirs = [
    '.git',
    'logs',
    'tmp',
    'node_modules',
    'pm2.config.js',
    'ecosystem.config.js'
];

module.exports = {
    apps: [
        /**
         * Production config
         */
        {
            exec_mode: 'cluster_mode',
            ignore_watch: ignoreWatchDirs,
            instance_var: 'INSTANCE_ID',
            instances: 'max',
            name: 'framework-production',
            node_args: [],
            script: 'app.js',
            env: {
                NODE_ENV: 'production'
            }
        },

        /**
         * Development config
         */
        {
            args: ['--color'],
            instance_var: 'INSTANCE_ID',
            instances: 1,
            max_restarts: 1,
            min_uptime: 2000,
            name: 'framework-development',
            node_args: '--require dotenv/config',
            script: 'app.js',
            watch: true,
            env: {
                NODE_ENV: 'dev'
            }
        }
    ]
};
