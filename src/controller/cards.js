const Card = require("../models/Card");

module.exports = {
    async index(req, res) {


        const listId = req.params.listId;

        try {

            const cards = await Card.findAll({
                attributes: ["id", "description", "order", "dueDate", "listId"],
                where: {
                    listId: listId
                },
                include: [
                    {
                        association: "List",
                        attributes: ["id", "name"],
                    }
                ]
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

    },
    async update(req, res) {

    },
    async delete(req, res) {

    }
}