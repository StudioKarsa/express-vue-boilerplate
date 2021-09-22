import { HTTP_STATUS } from 'common'
import type { RequestHandler } from 'express'
import type { Schema } from 'joi'

/**
 * Joi validation middleware
 */
export default function (schema: Schema): RequestHandler {
  return function (req, res, next) {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
        error: error.details[0].message,
      })
    }
    next()
  }
}
