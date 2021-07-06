const ProductBacklog = require("../../models/ProductBacklog");
const Sprint = require("../../models/Sprint");
const { findGroupById } = require("../../repositories/group");
const { findSprintById } = require("../../repositories/sprint");

module.exports = {
  async index(req, res) {
    const groupId = req.params.groupId;

    try {
      const group = await findGroupById(groupId);

      if (!groupId)
        return res.status(404).send({ error: "Grupo não encontrado" });

			const sprint = await Sprint.findAll({where: {
				groupId : groupId
			}});

			res.send(sprint).status(200)
    
    } catch (error) {
			console.log(error)
		}
  },
  async store(req, res) {
    const groupId = req.params.groupId;

    const { stories, name, timeBox } = req.body;

    console.log(...stories);

    try {
      const group = await findGroupById(groupId);

      if (!group)
        return res.status(404).send({ error: "Grupo não encontrado" });

      const sprintCount = await Sprint.count({
        where: {
          groupId: groupId,
        },
      });

      const sprint = await group.createSprint({
        name: name ? name : `Sprint ${sprintCount + 1}`,
        timeBox: timeBox,
      });

      const productBacklogs = await ProductBacklog.findAll({
        where: {
          id: stories,
        },
      });

      if (!productBacklogs)
        return res
          .status(404)
          .send({ error: "Nenhuma história encontrada para esse grupo" });

      const addStoriesSprint = await sprint.addProductBacklogs(productBacklogs);

      res.status(201).send(addStoriesSprint);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async update(req, res) {
    const sprintId = req.params.sprintId;

    const { stories } = req.body;

    try {
      const sprint = await findSprintById(sprintId);

      if (!sprint)
        return res.status(404).send({ error: "Sprint não encontrada" });

      await sprint.addProductBacklogs(stories);

      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async find(req, res) {
    const sprintId = req.params.sprintId;

    try {
      const sprint = await Sprint.findByPk(sprintId, {
        attributes: ["id", "name", "createdAt"],
        include: [
          {
            association: "Group",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!sprint)
        return res.status(404).send({ error: "Sprint não encontrada" });

      res.send(sprint);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
