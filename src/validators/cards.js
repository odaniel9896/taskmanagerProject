const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().min(8).max(255).required(),
      dueDate: Joi.date().iso(),
      initialDate: Joi.date().iso(),
      users: Joi.array(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        listId: Joi.number().required()
    }),
  }),
}