import { HTTP_METHODS } from 'common'
import { createRoute } from '../../utils/router'
import { createPostModule } from './post'

/**
 * @param {{ router: import('express').Router, database: import('@prisma/client').PrismaClient, logger: import('winston').Logger }} opts
 */
export function createV1Module({ router, database, logger }) {
  createPostModule({ router, database, logger })

  createRoute({
    router,
    path: '/v1',
    method: HTTP_METHODS.GET,
    handler: (req, res) => {
      res.json({
        message: 'Welcome to the API',
      })
    },
  })

  return router
}
