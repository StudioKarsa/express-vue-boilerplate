import mysql2 from 'mysql2/promise'
import config from 'app-config'
import logger from '../logger'

logger.info('Connecting to database')
logger.debug(`host: ${config.database.host}`)
logger.debug(`user: ${config.database.user}`)
logger.debug(`database: ${config.database.database}`)

export const database = mysql2.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
})

// Exit if the connection to the database fails
database.getConnection().catch((err) => {
  logger.error('MySQL Database connection failed')
  logger.error(err)
  process.exit(1)
})

export default database
