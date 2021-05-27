const ProductBacklog = require("../../models/ProductBacklog");
const Sprint = require("../../models/Sprint");
const { findGroupById } = require("../../repositories/group");
const { findSprintById } = require("../../repositories/sprint");

module.exports = {
    async store(req, res) {

        const groupId = req.params.groupId;

        const { stories, name } = req.body;

        try {

            const group = await findGroupById(groupId);

            if (!group)
                return res.status(404).send({ error: "Grupo não encontrado" })

            const sprintCount = await Sprint.count({
                where: {
                    groupId: groupId
                }
            });

            const sprint = await group.createSprint({
                name: name ? name : `Sprint ${sprintCount + 1}`,
                timeBox: new Date
            })
            
            const productBacklogs = await ProductBacklog.findAll({
                where: {
                    id : 
                        stories
                }
            })

            if(!productBacklogs)
                return res.status(404).send({ error: "Nenhuma história encontrada para esse grupo"})

            const addStoriesSprint = await sprint.addProductBacklogs(productBacklogs)

            res.status(201).send(addStoriesSprint)

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}