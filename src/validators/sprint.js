const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).max(255).required(),
      stories: Joi.array(),
      timeBox: Joi.date().iso().required()
    }),
    [Segments.PARAMS]: Joi.object().keys({
        groupId: Joi.number().required()
    })
  }),
}