import { PrismaClient } from '@prisma/client'
import config from 'app-config'
import logger from '../logger'

logger.info('Connecting to database')
logger.debug('---- MySQL Details ----')
logger.debug(`host: ${config.database.host}`)
logger.debug(`port: ${config.database.port}`)
logger.debug(`user: ${config.database.user}`)
logger.debug(`database: ${config.database.database}`)
logger.debug(`url: ${config.database.url}`)
logger.debug('------------------------')

export function createPrismaClient() {
  return new PrismaClient({
    log: [
      { level: 'warn', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'info', emit: 'event' },
    ],
  })
}

export default createPrismaClient
