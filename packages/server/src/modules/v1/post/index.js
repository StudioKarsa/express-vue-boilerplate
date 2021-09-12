import { createPostRoutes } from './routes'
import { createPostStore } from './store'
import { createPostController } from './controller'

export function createPostModule({ router, database, logger }) {
  const store = createPostStore({ database, logger })
  const controller = createPostController({ database, store, logger })

  createPostRoutes({
    router,
    controller,
  })

  return router
}
