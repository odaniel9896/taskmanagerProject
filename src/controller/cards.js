const Card = require("../models/Card");
const List = require("../models/List");

module.exports = {
    async index(req, res) {

        const listId = req.params.listId;

        try {

            const cards = await Card.findAll({
                attributes: ["id", "description", "order", "dueDate", "listId"],
                where: {
                    listId: listId
                },
            });

            if (!cards)
                return res.status(404).send({ error: "Grupo não existe" });

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
            const list = await List.findByPk(listId);

            if (!list)
                return res.status(404).send({ error: "Lista não encontrada" });

            const totalCard = await Card.count({
                where: {
                    listId: listId
                }
            });

            const cardCreate = await Card.create({
                description: description,
                dueDate: new Date,
                order: totalCard + 1,
                listId: listId
            });

            await cardCreate.addUsers(users)

            res.status(201).send({
                id: cardCreate.id,
                description: cardCreate.description,
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async update(req, res) {
        const cardId = req.params.cardId;

        const { description } = req.body;

        try {
            const card = await Card.findOne({
                where: {
                    id: cardId,
                }
            });
            if (!card)
                return res.status(404).send({ error: "Lista não encontrada" });

            if (list.workspaceId != workspaceId)
                return res.status(404).send({ error: "Não permitido" });

            list.name = name;

            list.save();

            res.status(200).send({
                id: list.id,
                name: list.name
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {

    }
}