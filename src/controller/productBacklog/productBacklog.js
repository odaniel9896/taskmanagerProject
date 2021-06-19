const ProductBacklog = require("../../models/ProductBacklog");
const { findGroupById } = require("../../repositories/group");

module.exports = {
  async store(req, res) {
    const groupId = req.params.groupId;

    const { description, priority } = req.body;

    try {
      const group = await findGroupById(groupId);

      if (!group)
        return res.status(404).send({ error: "Grupo não encontrado" });

      const storie = await group.createProductBacklog({
        description: description,
        priorityId: priority,
      });

      res.status(201).send(storie);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async delete(req, res) {
    const storieId = req.params.storieId;
    const groupId = req.params.groupId;

    try {
      const storie = await ProductBacklog.findByPk(storieId);

      if (!storie)
        return res
          .status(404)
          .send({ error: "Essa história não existe para ser apagada." });

      if (!storie.groupId === groupId)
        return res.status(404).send({ error: "Não permitido" });

      await storie.destroy();

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async index(req, res) {
    const groupId = req.params.groupId;

    try {
      const group = await findGroupById(groupId);

      if (!group)
        return res.status(404).send({ error: "Grupo não encontrado" });

      const listStories = await group.getProductBacklogs({
        attributes: [
          "id",
          "description",
          "groupId",
          "sprintId",
          "priorityId",
          "createdAt",
          "updatedAt",
        ],
      });

      res.send(listStories);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
