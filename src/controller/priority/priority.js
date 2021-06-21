const Priority = require("../../models/Priority");

module.exports = {
  async index(req, res) {
    try {
      const priorities = await Priority.findAll();

      res.send(priorities);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};