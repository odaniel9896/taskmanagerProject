const Card = require("../../models/Card");
const { findOneCard } = require("../../repositories/cards");

module.exports = {
  async update(req, res) {
    const { initialDate, dueDate, progressId, priorityId } = req.body;

    const cardId = req.params.cardId;

    try {
      const card = await findOneCard(cardId);

      if (!card) return res.status(404).send({ error: "Card não encontrado" });

      card.initialDate = initialDate;
      card.dueDate = dueDate;
      card.progressId = progressId;
      card.priorityId = priorityId;

      card.save();

      res.send().status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async index(req, res) {
    const cardId = req.params.cardId;

    const { userRole } = req;

    try {


      const role = userRole === "student" ? "Student" : "Teacher"

      const card = await Card.findOne({
        where: {
          id: cardId,
        },
        attributes: ["id", "description", "initialDate", "dueDate", "updatedAt", "createdAt"],
        include: [
          {
            association: "Progress",
            attributes: ["id", "progress"],
          },
          {
            association: "Priority",
            attributes: ["id", "priority"],
          },
          {
            association: "Users",
            attributes: ["id"],
            through: { attributes: [] },
            include: [
              {
                association: `${role}`,
                attributes: ["id", "name", "profileImage"],
              },
            ],
          },
        ],
      });

      if (!card) return res.status(404).send({ error: "Card não encontrado" });

      res.send(card).status(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
