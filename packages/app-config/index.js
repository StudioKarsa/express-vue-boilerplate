import dotenv from 'dotenv'
import { __isProd__, __isTest__ } from 'common'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import pkg from '../../package.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: path.join(__dirname, !__isProd__ ? '.env' : '.env.production'),
})

export const app = {
  name: pkg.name,
  version: pkg.version,
  port: __isTest__ ? 0 : process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
}

export const logger = {
  level: __isProd__ ? 'error' : 'debug',
  // Path is for production only
  path: '/var/log/app.log',
}

export const database = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_NAME || 'test',
}

database.url = `mysql://${database.user}:${database.password}@${database.host}:${database.port}/${database.database}`

export default {
  app,
  logger,
  database,
}
