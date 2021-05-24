const { findSprintById } = require("../../repositories/sprint");

module.exports = {
    async store(req, res) {

        const sprintId = req.params.sprintId;

        const { feedback } = req.body;

        try {
            const sprint = await findSprintById(sprintId)

            if (!sprint)
                return res.status(404).send({ error: "Sprint não encontrada" });

            const createSprintReview = await sprint.createSprintReview({
                feedback : feedback,
            })

            res.status(201).send(createSprintReview);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}