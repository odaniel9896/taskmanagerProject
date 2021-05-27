const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      feedback: Joi.string().min(8).max(255).required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        sprintId: Joi.number().required()
    })
  }),
}