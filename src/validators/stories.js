const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().min(8).max(255),
      priority: Joi.number().min(1).max(1)
    }),
    [Segments.PARAMS]: Joi.object().keys({
        groupId: Joi.number().required()
    })
  }),
  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        sprintId: Joi.number().required()
    }),
    [Segments.PARAMS]: Joi.object().keys({
        groupId: Joi.number().required()
    })
  }),
}