const DailyScrum = require("../../models/DailyScrum");
const { findSprintById } = require("../../repositories/sprint");

module.exports = {
    async store(req, res) {

        const sprintId = req.params.sprintId;

        const { doneYesterday, goingToDoDay, someObstacle } = req.body;

        try {
            const sprint = await findSprintById(sprintId)

            if (!sprint)
                return res.status(404).send({ error: "Sprint não encontrada" });

            const createDailyScrum = await DailyScrum.create({
                doneYesterday : doneYesterday,
                goingToDoDay: goingToDoDay,
                someObstacle: someObstacle,
                sprintId: sprintId,
            })

            res.status(201).send(createDailyScrum);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },  
}