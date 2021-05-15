const Group = require("../../models/Group");
const List = require("../../models/List");
const User = require("../../models/User");

module.exports = {
    async index(req, res) {


        const groupId = req.params.groupId;

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
                return res.status(404).send({ error: "Grupo não existe" });

            if (!group.Workspace.id)
                return res.status(404).send({ error: "Esse grupo não tem uma workspace" });

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
                    workspaceId: group.Workspace.id
                },
                order: [["order", "ASC"]]

            })

            res.send(list)
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
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
        const { userId, userRole } = req;

        const listId = req.params.listId;

        const groupId = req.params.groupId;

        try {

            const user = await User.findByPk(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            let association;
            
            if(userRole === "teacher")
                association = "Teachers"
            else
                association = "Students"    

            const group = await Group.findByPk(groupId, {
                attributes: [
                    "id",
                    "name",
                ],
                include: [
                    {
                        association: `${association}`,
                        attributes: ["id", "name"],
                        where: {
                            id: user.id,
                        },
                        through: { attributes: [] }
                    },
                    {
                        association: "Workspace",
                        attributes: ["id", "name"],
                    }
                ],
            });

            const list = await List.findOne({
                where: {
                    id: listId,
                    workspaceId: group.Workspace.id
                }
            });

            if(!list)
                return res.status(404).send({ error: "Lista não encontrada"});
            
            if(list.workspaceId !== group.Workspace.id)
                return res.status(404).send({ error: "Essa lista não pertence a esse workspace" });

            await list.destroy();

            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async update(req, res) {
        const listId = req.params.listId;

        const workspaceId = req.params.workspaceId;

        const { name } = req.body;

        try {
            const list = await List.findOne({
                where: {
                    id: listId,
                    workspaceId: workspaceId
                }
            });
            if (!list)
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
    }
}