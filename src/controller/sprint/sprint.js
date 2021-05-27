const ProductBacklog = require("../../models/ProductBacklog");
const Sprint = require("../../models/Sprint");
const { findSprintById } = require("../../repositories/sprint");

module.exports = {
    async store(req, res) {

        const sprintId = req.params.sprintId;

        const { stories } = req.body;

        try {

            const sprint = await findSprintById(sprintId);

            const storie = await ProductBacklog.findAll({
                where: {
                    id:         
                           stories
                }
            });

            console.log(storie)

            // if (!storie)
            //     return res.status(404).send({ error: "História não encontrada" })

            // const sprint = await Sprint.create({
            //     name: `Sprint ${storieCount + 1}`,
            //     timeBox: new Date
            // });

            // await sprint.addProductBacklogs(
            //     storieId
            // );

            res.status(201).send(storie)

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}