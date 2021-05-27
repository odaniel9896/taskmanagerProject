const { findGroupById } = require("../../repositories/group");

module.exports = {
    async store(req, res) {

        const groupId = req.params.groupId

        const { description, priority } = req.body;

        try {
            const group = await findGroupById(groupId);

            if (!group)
                return res.status(404).send({ error: "Grupo não encontrado" });

            const storie = await group.createProductBacklog({
                description : description,
                priorityId: priority
            });  
            
            res.status(201).send(storie)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}