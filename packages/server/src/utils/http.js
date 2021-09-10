import validator from '../middleware/validator'

export const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  HEAD: 'head',
  OPTIONS: 'options',
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
}

export const HTTP_STATUS_MESSAGES = {
  [HTTP_STATUS.OK]: 'OK',
  [HTTP_STATUS.CREATED]: 'Created',
  [HTTP_STATUS.ACCEPTED]: 'Accepted',
  [HTTP_STATUS.NO_CONTENT]: 'No content',
  [HTTP_STATUS.BAD_REQUEST]: 'Bad request',
  [HTTP_STATUS.UNAUTHORIZED]: 'Unauthorized',
  [HTTP_STATUS.FORBIDDEN]: 'Forbidden',
  [HTTP_STATUS.NOT_FOUND]: 'Not found',
  [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'Method not allowed',
  [HTTP_STATUS.CONFLICT]: 'Conflict',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal server error',
}

export const HTTP_STATUS_MESSAGE = (code) => HTTP_STATUS_MESSAGES[code]

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
