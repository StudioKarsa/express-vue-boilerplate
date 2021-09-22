import { createPostRoutes } from './routes'
import { createPostStore } from './store'
import { createPostController } from './controller'

/**
 * @param {{ router: import('express').Router, database: import('@prisma/client').PrismaClient, logger: import('winston').Logger }} opts
 */
export function createPostModule({ router, database, logger }) {
  const store = createPostStore({ database, logger })
  const controller = createPostController({ store, logger })

  createPostRoutes({
    router,
    controller,
  })

  return router
}
