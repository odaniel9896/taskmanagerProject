const Card = require("../../models/Card");
const { QueryTypes } = require('sequelize');
const connection = require("../../database");

module.exports = {
    async update(req, res) {

        const cardId = req.params.cardId;
        const listId = req.params.listId;
        const { order } = req.body;

        try {
            const card = await Card.findByPk(cardId, {
                attributes: ["id", "description", "order", "listId"],
                where: {
                    listId: listId
                },
            })
            if (!card)
                return res.status(404).send({ error: "Lista não encontrada" });

            if (order > card.order) {
                await connection.query(
                    'UPDATE cards set `order` = `order` - 1 where `order` between :aux and :order',
                    {
                        type: QueryTypes.UPDATE,
                        replacements: { aux: card.order + 1, order: order },
                    }
                );
                await Card.update(
                    {
                        order: order
                    },
                    {
                        where: {
                            id: cardId
                        }
                    }
                )
                res.status(200).send()
            }
            else {
                await connection.query(
                    'UPDATE cards set `order` = `order` + 1 where `order` between :aux and :order',
                    {
                        type: QueryTypes.UPDATE,
                        replacements: { aux: card.order, order: order },
                    }
                );
                await Card.update(
                    {
                        order: order
                    },
                    {
                        where: {
                            id: cardId
                        }
                    }
                )
                res.status(200).send()
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}