import { createRoute, HTTP_METHODS } from '../../utils/http'
import { createPostModule } from './post'

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
