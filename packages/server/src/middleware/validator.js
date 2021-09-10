/**
 * Joi validation middleware
 *
 * @param {import('joi').Schema} schema
 */
export default function (schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(422).json({
        error: error.details[0].message,
      })
    }
    next()
  }
}
