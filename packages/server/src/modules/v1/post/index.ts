import { createPostRoutes } from './routes'
import { createPostStore } from './store'
import { createPostController } from './controller'

import type { ModuleContext } from '../../types'

export function createPostModule({ router, database, logger }: ModuleContext) {
  const store = createPostStore({ database, logger })
  const controller = createPostController({ store, logger })

  createPostRoutes({
    router,
    controller,
  })

  return router
}
