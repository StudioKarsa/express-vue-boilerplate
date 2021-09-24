const env = process.argv[process.argv.indexOf('--env') + 1]
const isProduction = env === 'production'

module.exports = {
  apps: [
    {
      name: 'server',
      script: isProduction ? './packages/server/dist/index.js' : './packages/server/src/index.ts',
      instances: 'max',
      exec_mode: 'cluster',
      watch: !isProduction,
      ignore_watch: ['node_modules', '.git', 'dist', 'coverage'],
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'website',
      script: isProduction ? 'serve' : './scripts/dev_website.js',
      env_production: {
        PM2_SERVE_PATH: './packages/website/dist',
        PM2_SERVE_PORT: '8080',
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
      },
    },
  ],
}
