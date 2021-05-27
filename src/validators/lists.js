const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(8).max(255).required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        workspaceId: Joi.number().required()
    }),
  }),
}