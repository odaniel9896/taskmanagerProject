const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      doneRight: Joi.string().min(8).max(255).required(),
      doneError: Joi.string().min(8).max(255).required(),
      fieldAction: Joi.string().min(8).max(255),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        sprintId: Joi.number().required()
    })
  }),
}