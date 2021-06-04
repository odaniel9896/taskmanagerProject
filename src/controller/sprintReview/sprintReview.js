const { findSprintById } = require("../../repositories/sprint");
const { findAllSprintReviews } = require("../../repositories/sprintReview");

module.exports = {
    async store(req, res) {

        const sprintId = req.params.sprintId;

        const { feedback, wasDelivered } = req.body;

        try {
            const sprint = await findSprintById(sprintId)

            if (!sprint)
                return res.status(404).send({ error: "Sprint não encontrada" });

            const createSprintReview = await sprint.createSprintReview({
                feedback: feedback,
                wasDelivered : wasDelivered
            })

            res.status(201).send(createSprintReview);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async index(req, res) {

        const sprintId = req.params.sprintId;

        try {
            const sprint = await findSprintById(sprintId);

            if (!sprint)
                return res.status(404).send({ error: "Sprint não encontrada" });

            const sprintReview = await findAllSprintReviews(sprintId)

            res.send(sprintReview);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}