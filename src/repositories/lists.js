const List = require("../models/List")

module.exports = {
    async findAllList({ workspaceId }) {

        const list = await List.findAll({
            attributes: ["id", "name", "order"],
            include: [
                {
                    association: "Workspace",
                    attributes: ["id", "name"],
                    include: [
                        {
                            association: "Group",
                            attributes: ["id", "name"],
                        }
                    ]
                }
            ],
            where: {
                workspaceId: workspaceId
            },
            order: [["order", "ASC"]]

        })

        return list;
    },
    async countList({ workspaceId }) {
        const totalList = await List.count({
            where: {
                workspaceId: workspaceId
            }
        });
        return totalList;
    },
    async createList({ workspaceId, order, name }) {
        const list = await List.create({
            name: name,
            workspaceId: workspaceId,
            order: order
        })
        return list;
    },
    async findOneList(listId, workspaceId) {
        const list = await List.findOne({
            where: {
                id: listId,
                workspaceId: workspaceId
            }
        });
        return list;
    },
    async findOneListOrder(listId, workspaceId) {
        const list = await List.findByPk(listId, {
            attributes: ["id", "name", "order", "workspaceId"],
            where: {
                workspaceId: workspaceId
            },
        })
        return list;
    },
    async listOrderUpdate(order, listId) {
        const list = await List.update(
            {
                order: order
            },
            {
                where: {
                    id: listId
                }
            }
        )
    }
}