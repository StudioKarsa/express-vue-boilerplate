import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import pkg from '../../package.json'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: path.join(__dirname, process.env.NODE_ENV !== 'production' ? '.env' : '.env.production'),
})

const databaseHost = process.env.MYSQL_HOST || 'localhost'
const databasePort = process.env.MYSQL_PORT || '3306'
const databaseUser = process.env.MYSQL_USER || 'root'
const databasePassword = process.env.MYSQL_PASSWORD || ''
const databaseName = process.env.MYSQL_NAME || 'test'

export default {
  app: {
    name: pkg.name,
    version: pkg.version,
    port: process.env.NODE_ENV === 'test' ? 0 : process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
  },
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    // Path is for production only
    path: '/var/log/app.log',
  },
  database: {
    host: databaseHost,
    port: databasePort,
    user: databaseUser,
    password: databasePassword,
    database: databaseName,
    url: `mysql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`,
  },
}
