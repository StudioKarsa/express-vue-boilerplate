import { createPostRoutes } from './routes'
import { createPostStore } from './store'
import { createPostController } from './controller'

export function createPostModule({ router, database }) {
  const store = createPostStore({ database })
  const controller = createPostController({ database, store })

  createPostRoutes({
    router,
    controller,
  })

  return router
}
