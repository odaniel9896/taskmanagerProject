const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      task: Joi.string().min(8).max(255).required(),
      dueDate: Joi.date().iso()
    }),
    [Segments.PARAMS]: Joi.object().keys({
        cardId: Joi.number().required()
    }),
  }),
}