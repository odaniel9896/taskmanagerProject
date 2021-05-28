const { findUserById } = require("../../repositories/user");
const { findGroupById } = require("../../repositories/group");

module.exports = {
    async store(req, res) {

        const { userId } = req;

        const groupId = req.params.groupId;

        const { name } = req.body;

        try {

            const user = await findUserById(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const group = await findGroupById(groupId);

            if(!group)
                return res.status(404).send({ error: "Grupo não encontrado"});

            const workspace = await group.createWorkspace({
                name: name
            });

            await workspace.createList({
                name : "Backlog",
                order: 1
            })

            await workspace.createList({
                name : "Em desenvolvimento",
                order: 2
            })
            
            await workspace.createList({
                name : "Em testes",
                order: 3
            })

            await workspace.createList({
                name : "Em Analise",
                order: 4
            })

            await workspace.createList({
                name : "Concluido",
                order: 5
            })

            res.status(201).send({
                    id: workspace.id,
                    name: workspace.name,
                    groupId: group.id
            })

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }
}