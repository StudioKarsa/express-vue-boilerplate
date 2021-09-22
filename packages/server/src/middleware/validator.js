import { HTTP_STATUS } from 'common'

/**
 * Joi validation middleware
 *
 * @param {import('joi').Schema} schema
 */
export default function (schema) {
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
