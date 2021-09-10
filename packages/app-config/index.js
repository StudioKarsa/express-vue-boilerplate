import dotenv from 'dotenv'
import pkg from '../../package.json'

dotenv.config()

export default {
  app: {
    name: pkg.name,
    version: pkg.version,
    port: process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  },
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    // Path is for production only
    path: '/var/log/app.log',
  },
  database: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
  },
}
