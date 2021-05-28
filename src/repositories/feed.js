const Workspace = require("../models/Workspace")

module.exports = {
    async feedCard(workspaceId) {
        const feed = await Workspace.findAll({
            where: {
                id: workspaceId
            },
            attributes: [
                "id",
                "name",
                "backgroundImage"
            ],
            include: [
                {
                    association: "Lists",
                    attributes: ["id", "name", "order", "createdAt"],
                    include: [
                        {
                            association: "Card",
                            attributes: ["id", "description", "dueDate", "order", "createdAt"],
                            include: [
                                {
                                    association: "ProductBacklog",
                                    attributes: ["id", "description", "sprintId", "priorityId"],
                                    include: [
                                        {
                                            association: "Priority",
                                            attributes: ["id", "priority"]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        )
        return feed;
    }
}