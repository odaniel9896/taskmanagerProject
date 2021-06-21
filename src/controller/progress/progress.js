const Progress = require("../../models/Progress");

module.exports = {
  async index(req, res) {
    try {
      const progress = await Progress.findAll();

      res.send(progress);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};