const List = require("../../models/List");
const { Op, Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
const connection = require("../../database");

module.exports = {
    async update(req, res) {

        const listId = req.params.listId;
        const workspaceId = req.params.listId;
        const { order } = req.body;

        try {
            const list = await List.findByPk(listId, {
                attributes: ["id", "name", "order", "workspaceId"],
                where: {
                    workspaceId: workspaceId
                },
            })
            if (!list)
                return res.status(404).send({ error: "Lista não encontrada" });

            if (order > list.order) {
                await connection.query(
                    'UPDATE lists set `order` = `order` - 1 where `order` between :aux and :order',
                    {
                        type: QueryTypes.UPDATE,
                        replacements: { aux: list.order + 1, order: order },
                    }
                );
                await List.update(
                    {
                        order: order
                    },
                    {
                        where: {
                            id: listId
                        }
                    }
                )
                res.status(200).send()
            }
            else {
                await connection.query(
                    'UPDATE lists set `order` = `order` + 1 where `order` between :aux and :order',
                    {
                        type: QueryTypes.UPDATE,
                        replacements: { aux: list.order, order: order },
                    }
                );
                await List.update(
                    {
                        order: order
                    },
                    {
                        where: {
                            id: listId
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