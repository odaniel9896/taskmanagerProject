const Card = require("../models/Card");

module.exports = {
    async findAllCards(listId) {

        const cards = await Card.findAll({
            attributes: ["id", "description", "order", "dueDate", "listId"],
            where: {
                listId: listId
            },
        });

        return cards;
    },
    async totalCards(listId) {
        const totalCard = await Card.count({
            where: {
                listId: listId
            }
        });
        return totalCard;
    },
    async cardCreate({ description, order, listId, dueDate }) {
        const cardCreate = await Card.create({
            description: description,
            dueDate: dueDate,
            order: order + 1,
            listId: listId
        });

        return cardCreate;
    },
    async findOneCard(cardId) {
        const card = await Card.findOne({
            where: {
                id: cardId,
            },
            include: [
                {
                    association: "Users",
                    attributes: ["id"]
                }
            ]
        });
        return card
    },
    async findOneCardOrder(cardId, listId) {
        const card = await Card.findByPk(cardId, {
            attributes: ["id", "description", "order", "listId"],
            where: {
                listId: listId
            },
        });
        return card;
    },
    async cardUpdateOrder(order, cardId) {
        const card = await Card.update(
            {
                order: order
            },
            {
                where: {
                    id: cardId
                }
            }
        )
        return card;
    }
}