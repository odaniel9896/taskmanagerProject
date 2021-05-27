const Card = require("../../models/Card");
const List = require("../../models/List");
const { findAllCards, totalCards, cardCreate, findOneCard } = require("../../repositories/cards");
const { findListByPk } = require("../../repositories/lists");

module.exports = {
    async index(req, res) {

        const listId = req.params.listId;

        try {

            const cards = await findAllCards(listId);

            if (!cards)
                return res.status(404).send({ error: "Essa lista não existe" });

            res.send(cards)
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async store(req, res) {

        const listId = req.params.listId;

        const { description, dueDate, users } = req.body;

        try {
            const list = await findListByPk(listId);

            if (!list)
                return res.status(404).send({ error: "Lista não encontrada" });

            const totalCard = await totalCards(listId);

            const cardCreatea = await cardCreate({description, order : totalCard, listId, dueDate})

            await cardCreatea.addUsers(users)

            res.status(201).send({
                id: cardCreatea.id,
                description: cardCreatea.description,
                order : cardCreatea.order,
                dueDate : cardCreatea.dueDate,
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async update(req, res) {
        const cardId = req.params.cardId;

        const { userId } = req;

        const { description } = req.body;

        try {
            const card = await findOneCard(cardId)

            if (!card)
                return res.status(404).send({ error: "Card não encontrada" });

            if (!card.Users.map(user => user.id).indexOf(card.Users.map(user => user.id)) === userId)
                return res.status(404).send({ error: "Não permitido" });

            card.description = description;

            card.save();

            res.status(200).send({
                id: card.id,
                description: card.description
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        const cardId = req.params.cardId;

        const { userId } = req;

        try {
            const card = await findOneCard(cardId);

            if (!card)
                return res.status(404).send({ error: "Card não encontrado" });

            if (!card.Users.map(user => user.id).indexOf(card.Users.map(user => user.id)) === userId)
                return res.status(404).send({ error: "Não permitido" });

            await card.destroy();

            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}