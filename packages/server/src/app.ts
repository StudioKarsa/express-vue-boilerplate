import express from 'express'
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from 'common'
// @ts-ignore xss-clean does not have type definitions
import xss from 'xss-clean'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import type { Application, Request, Response, NextFunction } from 'express'
import type { PrismaClient } from '@prisma/client'
import type { Logger } from 'winston'

import { createV1Module } from './modules/v1'

export type AppOptions = {
  database: PrismaClient
  logger: Logger
}

export const createApp = ({ database, logger }: AppOptions): Application => {
  const app = express()

  app.use(compression())
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  )
  app.use(xss())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const router = express.Router()

  app.get('/health', (req, res) => {
    res.status(HTTP_STATUS.OK).json({
      status: 'ok',
    })
  })

  app.use('/v1', createV1Module({ router, database, logger }))

  app.get('*', (req, res) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: HTTP_STATUS_MESSAGE(HTTP_STATUS.NOT_FOUND),
    })
  })

  // Catches errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTP_STATUS_MESSAGE(HTTP_STATUS.INTERNAL_SERVER_ERROR),
    })
  })

  return app
}
