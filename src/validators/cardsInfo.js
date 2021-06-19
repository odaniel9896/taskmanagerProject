const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      dueDate: Joi.date().iso(),
      initialDate: Joi.date().iso(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        cardId: Joi.number().required()
    }),
  }),
}