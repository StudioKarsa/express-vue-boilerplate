import express from 'express'
import { HTTP_STATUS } from 'common'
import xss from 'xss-clean'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import { createV1Module } from './modules/v1'

export const createApp = ({ database, logger }) => {
  const app = express()

  app.use(compression())
  app.use(cors())
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
      message: 'Not found',
    })
  })

  return app
}
