const SprintRetrospective = require("../models/SprintRetrospective");

module.exports = {
    async findAllSprintRetrospectives(sprintId) {
        const sprints = await SprintRetrospective.findAll({
            where: {
                sprintId: sprintId
            },
            attributes: [
                "id",
                "doneRight",
                "doneError",
                "fieldAction",
                "createdAt",
                "sprintId"
            ],
            order: [["createdAt", "DESC"]]
        });

        return sprints;
    },
}