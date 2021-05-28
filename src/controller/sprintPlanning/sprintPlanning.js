const SprintPlanning = require("../../models/SprintPlanning");
const { findSprintById } = require("../../repositories/sprint");

module.exports = {
    async store(req, res) {

        const sprintId = req.params.sprintId;

        const { ata } = req.body;

        try {
            const sprint = await findSprintById(sprintId)

            if (!sprint)
                return res.status(404).send({ error: "Sprint não encontrada" });

            const createSprintPlanning = await sprint.createSprintPlanning({
                ata: ata
            });

            res.status(201).send(createSprintPlanning);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
}