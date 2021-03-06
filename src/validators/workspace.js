const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(8).max(255).required(),
      backgroundImage: Joi.string().min(8).max(255),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        groupId: Joi.number().required()
    }),
  }),
}