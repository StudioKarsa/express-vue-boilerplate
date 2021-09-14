const env = process.argv[process.argv.indexOf('--env') + 1];
const isProduction = env === 'production';

module.exports = {
  apps: [
    {
      name: 'server',
      script: './packages/server/src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: !isProduction,
      ignore_watch: ['node_modules'],
      node_args: '--harmony --experimental-specifier-resolution=node',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'website',
      script: isProduction ? 'serve' : 'yarn workspace website dev',
      env_production: {
        PM2_SERVE_PATH: './packages/website/dist',
        PM2_SERVE_PORT: '8080',
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
      },
    },
  ],
}
