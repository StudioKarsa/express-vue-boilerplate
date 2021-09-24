import { HTTP_METHODS } from 'common'

import { createRoute } from '../../utils/router'
import { createPostModule } from './post'

import type { ModuleContext } from '../types';

export function createV1Module({ router, database, logger }: ModuleContext) {
  createPostModule({ router, database, logger })

  createRoute({
    router,
    path: '/',
    method: HTTP_METHODS.GET,
    handlers: (req, res) => {
      res.json({
        message: 'Welcome to the v1 API',
      })
    },
  })

  return router
}
