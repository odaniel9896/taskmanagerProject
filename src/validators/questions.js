const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(5).max(255).required(),
      description: Joi.string().min(10).max(255).required(),
    }),
  }),
};