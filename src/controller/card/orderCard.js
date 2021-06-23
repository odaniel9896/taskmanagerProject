const Card = require("../../models/Card");
const { QueryTypes } = require("sequelize");
const connection = require("../../database");
const {
  findOneCardOrder,
  cardUpdateOrder,
  totalCards,
} = require("../../repositories/cards");

module.exports = {
  async update(req, res) {
    const cardId = req.params.cardId;
    const listId = req.params.listId;
    const { order } = req.body;

    try {
      const card = await findOneCardOrder(cardId, listId);

      if (!card) return res.status(404).send({ error: "Card não encontrado" });

      if (order > card.order) {
        await connection.query(
          "UPDATE cards set `order` = `order` - 1 where `order` between :aux and :order and listId = :listId",
          {
            type: QueryTypes.UPDATE,
            replacements: { aux: card.order + 1, order: order, listId: listId },
          }
        );

        await cardUpdateOrder(order, cardId);

        res.status(200).send();
      } else {
        await connection.query(
          "UPDATE cards set `order` = `order` + 1 where `order` between :aux and :order and listId = :listId",
          {
            type: QueryTypes.UPDATE,
            replacements: { aux: order, order: card.order, listId: listId },
          }
        );

        await cardUpdateOrder(order, cardId);

        res.status(200).send();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async updateList(req, res) {
    const cardId = req.params.cardId;
    const listId = req.params.listId;

    try {
      const card = await findOneCardOrder(cardId, listId);

      if (!card) return res.status(404).send({ error: "Card não encontrado" });

      if (card.listId === listId)
        return res.status(404).send({ error: "O Card já está nessa lista" });

      const totalCardList = await totalCards(listId);

      await card.update({
        listId: listId,
        order: totalCardList + 1,
      });
      res.status(200).send();
    } catch (error) {
      console.log(error);
    }
  },
};
