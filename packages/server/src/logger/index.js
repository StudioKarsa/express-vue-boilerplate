import config from 'app-config'
import winston from 'winston'

export const logger = winston.createLogger({
  level: config.logger.level,
  format:
    process.env.NODE_ENV === 'production'
      ? winston.format.json()
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
          )
        ),
  transports:
    process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: config.logger.path,
            level: 'error',
          }),
        ]
      : [new winston.transports.Console()],
})

export default logger
