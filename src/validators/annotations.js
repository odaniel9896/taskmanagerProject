const { Segments, Joi, celebrate } = require("celebrate");


module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(3).max(255).required(),
      text: Joi.string().min(3).max(255).required(),
    })
  }),
}