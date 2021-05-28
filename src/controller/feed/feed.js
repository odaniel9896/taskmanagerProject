const Workspace = require("../../models/Workspace");

module.exports = {
    async index(req, res) {
        const workspaceId = req.params.workspaceId

        try {
            const workspace = await Workspace.findByPk(workspaceId);

            if (!workspace)
                return res.status(404).send({ error: "Workspace não encontrado" });

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

            console.log(feed);
            res.send(feed)
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}