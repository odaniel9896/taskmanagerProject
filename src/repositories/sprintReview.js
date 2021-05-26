const SprintReview = require("../models/SprintReview");

module.exports = {
    async findAllSprintReviews(sprintId) {
        const sprints = await SprintReview.findAll({
            where: {
                sprintId: sprintId
            },
            attributes: [
                "id",
                "feedback",
                "doneError",
                "sprintId"
            ],
            order: [["createdAt", "DESC"]]
        });

        return sprints;
    },
}