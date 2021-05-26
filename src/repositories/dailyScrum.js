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
}