const User = require("../../models/User");
const Group = require("../../models/Group");

module.exports = {
    async store(req, res) {

        const { userId } = req;

        const groupId = req.params.groupId;

        const { name } = req.body;

        try {

            const user = await User.findByPk(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const group = await Group.findByPk(groupId);

            if(!group)
                return res.status(404).send({ error: "Grupo não encontrado"});

            const workspace = await group.createWorkspace({
                name: name
            });
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