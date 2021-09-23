import { HTTP_METHODS } from 'common'
import type { RequestHandler, Router } from 'express'
import type { Schema } from 'joi'

import validator from '../middleware/validator'

export type RouteOptions = {
  router: Router
  method: HTTP_METHODS
  path: string
  validationSchema?: Schema | null
  handlers: RequestHandler
}

/**
 * Adds a new route to the server.
 */
export function createRoute({
  router,
  method = HTTP_METHODS.GET,
  path,
  validationSchema = null,
  handlers,
}: RouteOptions) {
  return validationSchema
    ? router[method](path, validator(validationSchema), handlers)
    : router[method](path, handlers)
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
  routes.forEach(({ method, path, validationSchema, handlers }) => {
    createRoute({ router, method, path, validationSchema, handlers })
  })
  return router
}
