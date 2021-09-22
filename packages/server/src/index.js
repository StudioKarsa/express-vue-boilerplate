import { createApp } from './app'
import { startServer } from './server'
import { createPrismaClient } from './database'
import logger from './logger'

const database = createPrismaClient()

database.$on('error', (e) => {
  logger.error(e)
})

database.$on('warn', (e) => {
  logger.warn(e)
})

database.$on('info', (e) => {
  logger.info(e)
})

async function main() {
  if (process.env.NODE_ENV !== 'test') {
    const app = createApp({ database, logger })
    const server = startServer(app)

    // Gracefully shutdown the server on SIGINT or SIGTERM
    process.on('SIGINT', async () => {
      logger.info('SIGINT received, shutting down gracefully')
      await database.$disconnect()
      server.close(() => {
        logger.info('Server closed')
        process.exit(0)
      })
    })

    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully')
      await database.$disconnect()
      server.close(() => {
        logger.info('Server closed')
        process.exit(0)
      })
    })

    process.on('uncaughtException', async (err) => {
      await database.$disconnect()
      server.close(() => {
        logger.error(err)
        process.exit(1)
      })
    })

    process.on('unhandledRejection', async (reason, p) => {
      await database.$disconnect()
      server.close(() => {
        logger.error('Unhandled Rejection at:')
        logger.error(JSON.stringify(p))
        logger.error('reason:')
        logger.error(reason)
        process.exit(1)
      })
    })
  }
}

main()
  .catch((err) => {
    logger.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await database.$disconnect()
  })
