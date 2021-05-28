const DailyScrum = require("../models/DailyScrum");

module.exports = {
    async findAllDailyScrum(sprintId) {
        const sprints = await DailyScrum.findAll({
            where: {
                sprintId: sprintId
            },
            attributes: [
                "id",
                "doneYesterday",
                "goingToDoDay",
                "someObstacle",
                "createdAt",
                "sprintId"
            ],
            order: [["createdAt", "DESC"]]
        });

        return sprints;
    },
    async createDailyScrum(sprintId, doneYesterday, goingToDoDay, someObstacle) {
        const dailyScrum = await DailyScrum.create({
            sprintId: sprintId,
            doneYesterday: doneYesterday,
            goingToDoDay: goingToDoDay,
            someObstacle: someObstacle,
        });

        return dailyScrum;
    }
}