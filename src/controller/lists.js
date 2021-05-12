const Group = require("../models/Group");
const List = require("../models/List");

module.exports = {
    async index(req, res) {

    },
    async store(req, res) {

        const { name } = req.body;

        const groupId = req.params.groupId;

        //select * from cards order by `order` asc

        // update cards set`order` = 4
        // where id = 145;

        // update cards set`order` = `order` - 1
        // where`order` between 3 and 4;

        try {
            const group = await Group.findByPk(groupId, {
                attributes: ["id", "name"],
                include: [
                    {
                        association: "Workspace",
                        attributes: ["id", "name"],
                    }
                ]
            });

            if (!group)
                return res.status(404).send({ error: "Grupo não encontrado" });

            if (!group.Workspace.id)
                return res.status(404).send({ error: "Esse grupo não tem uma workspace" });

            const totalList = await List.count({
                where: {
                    workspaceId: group.Workspace.id
                }
            });

            const list = await List.create({
                name: name,
                workspaceId: group.Workspace.id,
                order: totalList + 1
            })

            res.send(list)
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },
    async delete(req, res) {

    },
    async update(req, res) {

    }
}