import dotenv from 'dotenv'
import { __isProd__, __isTest__ } from 'common'
import path from 'path'

dotenv.config({
  path: path.join(__dirname, __isProd__ ? '../.env.production' : '../.env'),
})

export type AppConfig = {
  port: number
  env: string
  baseUrl: string
}

export type LoggerConfig = {
  level: string
  path: string
}

export type DatabaseConfig = {
  host: string
  port: number
  user: string
  password: string
  database: string
  url: string
}

export type Config = {
  app: AppConfig
  logger: LoggerConfig
  database: DatabaseConfig
}

export const app: AppConfig = {
  port: __isTest__ ? 0 : Number(process.env.PORT) || 5000,
  env: process.env.NODE_ENV || 'development',
  baseUrl:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
}

export const logger: LoggerConfig = {
  level: __isProd__ ? 'error' : 'debug',
  // Path is for production only
  path: '/var/log/app.log',
}

export const database: DatabaseConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'test',
  url: '',
}

database.url = `mysql://${database.user}:${database.password}@${database.host}:${database.port}/${database.database}`

export default {
  app,
  logger,
  database,
} as Config
