const { findSprintById } = require("../../repositories/sprint");
const { findAllSprintRetrospectives } = require("../../repositories/sprintRetrospective");

module.exports = {
    async store(req, res) {

        const sprintId = req.params.sprintId;

        const { doneError, doneRight, fieldAction } = req.body;

        try {
            const sprint = await findSprintById(sprintId)

            if (!sprint)
                return res.status(404).send({ error: "Sprint não encontrada" });

            const createSprintReview = await sprint.createSprintRetrospective({
                doneError : doneError,
                doneRight : doneRight,
                fieldAction: fieldAction
            })

            res.status(201).send(createSprintReview);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async index(req, res) {

        const  sprintId  = req.params.sprintId;

        try {
            const sprint = await findSprintById(sprintId);

            if (!sprint)
                return res.status(404).send({ error: "Sprint não encontrada" });

            const sprintRetrospective = await findAllSprintRetrospectives(sprintId)

            res.send(sprintRetrospective);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }  
}