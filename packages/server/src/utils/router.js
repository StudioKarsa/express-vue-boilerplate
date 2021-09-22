import { HTTP_METHODS } from 'common'
import validator from '../middleware/validator'

/**
 * Adds a new route to the server.
 */
export function createRoute({
  router,
  method = HTTP_METHODS.GET,
  path,
  validationSchema = null,
  handlers = [],
}) {
  return router[method.toLowerCase()](
    path,
    validationSchema ? [validator(validationSchema), ...handlers] : handlers
  )
}

/**
 * Adds multiple routes to the server using the `createRoute` function.
 */
export function createRoutes({ router, routes = [] }) {
  routes.forEach(({ method, path, validationSchema, handlers }) => {
    createRoute({ router, method, path, validationSchema, handlers })
  })
  return router
}
