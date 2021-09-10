import { createRoute } from '../../utils/http'
import { createPostModule } from './post'

export function createV1Module({ router, database }) {
  createPostModule({ router, database })

  createRoute({
    router,
    path: '/v1',
    method: 'get',
    handler: (req, res) => {
      res.json({
        message: 'Welcome to the API',
      })
    },
  })

  return router
}
