import { createApp } from './app'
import { startServer } from './server'
import { database } from './database'
import logger from './logger'

if (process.env.NODE_ENV !== 'test') {
  const app = createApp({ database, logger })
  const server = startServer(app)

  // Gracefully shutdown the server on SIGINT or SIGTERM
  process.on('SIGINT', async () => {
    logger.info('SIGINT received, shutting down gracefully')
    await database.end()
    server.close(() => {
      logger.info('Server closed')
      process.exit(0)
    })
  })

  process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, shutting down gracefully')
    await database.end()
    server.close(() => {
      logger.info('Server closed')
      process.exit(0)
    })
  })

  process.on('uncaughtException', async (err) => {
    await database.end()
    server.close(() => {
      logger.error(err)
      process.exit(1)
    })
  })

  process.on('unhandledRejection', async (reason, p) => {
    await database.end()
    server.close(() => {
      logger.error('Unhandled Rejection at:')
      logger.error(JSON.stringify(p))
      logger.error('reason:')
      logger.error(reason)
      process.exit(1)
    })
  })
}
