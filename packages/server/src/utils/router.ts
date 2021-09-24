import { HTTP_METHODS } from 'common'
import type { RequestHandler, Router } from 'express'
import type { Schema } from 'joi'

import validator from '../middleware/validator'

export type RouteOptions = {
  router: Router
  method: HTTP_METHODS
  path: string
  validationSchema?: Schema | null
  middleware?: RequestHandler[]
  handler: RequestHandler
}

/**
 * Adds a new route to the server.
 */
export function createRoute({
  router,
  method = HTTP_METHODS.GET,
  path,
  validationSchema = null,
  middleware = [],
  handler,
}: RouteOptions) {
  const route = router.route(path)

  return validationSchema
    ? route[method](...middleware, validator(validationSchema), handler)
    : route[method](...middleware, handler)
}

/**
 * Adds multiple routes to the server using the `createRoute` function.
 */
export function createRoutes({
  router,
  routes,
}: {
  router: Router
  routes: Omit<RouteOptions, 'router'>[]
}) {
  routes.forEach(({ method, path, validationSchema, middleware, handler }) => {
    createRoute({ router, method, path, validationSchema, middleware, handler })
  })
  return router
}
