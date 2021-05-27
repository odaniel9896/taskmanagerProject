const { Segments, Joi, celebrate } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      doneYesterday: Joi.string().min(8).max(255).required(),
      someObstacle: Joi.string().min(8).max(255).required(),
      goingToDoDay: Joi.string().min(8).max(255).required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
        sprintId: Joi.number().required()
    })
  }),
}