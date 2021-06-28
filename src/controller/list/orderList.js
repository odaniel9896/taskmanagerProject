const { QueryTypes } = require('sequelize');
const connection = require("../../database");
const { findOneListOrder, listOrderUpdate } = require("../../repositories/lists");

module.exports = {
    async update(req, res) {

        const listId = req.params.listId;
        const workspaceId = req.params.listId;
        const { order } = req.body;

        try {
            const list = await findOneListOrder(listId, workspaceId)

            if (!list)
                return res.status(404).send({ error: "Lista não encontrada" });

            if (order > list.order) {
                await connection.query(
                    'UPDATE Lists set `order` = `order` - 1 where `order` between :aux and :order and workspaceId = :workspaceId',
                    {
                        type: QueryTypes.UPDATE,
                        replacements: { aux: list.order + 1, order: order, workspaceId : workspaceId },
                    }
                );
                await listOrderUpdate(order, listId);
                res.status(200).send()
            }
            else {
                await connection.query(
                    'UPDATE Lists set `order` = `order` + 1 where `order` between :aux and :order and workspaceId = :workspaceId',
                    {
                        type: QueryTypes.UPDATE,
                        replacements: { aux: order, order: list.order, workspaceId : workspaceId },
                    }
                );
                await listOrderUpdate(order, listId)
                res.status(200).send()
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}