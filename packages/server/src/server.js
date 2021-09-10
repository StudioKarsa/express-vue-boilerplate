import { createServer } from 'http'
import config from 'app-config'
import logger from './logger'

export const startServer = (app) => {
  const server = createServer(app)

  return server.listen(config.app.port, () => {
    logger.info(`Server is running on port ${config.app.port} 🚀`)
    logger.info(`URL: ${config.app.baseUrl}`)
    logger.info(`PID: ${process.pid}`)
  })
}
