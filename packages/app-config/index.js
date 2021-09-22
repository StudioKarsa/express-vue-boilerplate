import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import pkg from '../../package.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV !== 'production' ? '.env' : '.env.production'
  ),
})

export default {
  app: {
    name: pkg.name,
    version: pkg.version,
    port: process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    baseUrl:
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
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
    url:
      process.env.DATABASE_URL ||
      `mysql://${process.env.MYSQL_USER || 'root'}:${
        process.env.MYSQL_PASSWORD || ''
      }@${process.env.MYSQL_HOST || 'localhost'}:${
        process.env.MYSQL_PORT || 3306
      }/${process.env.MYSQL_DATABASE || 'test'}`,
  },
}
