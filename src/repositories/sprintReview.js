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
                "sprintId"
            ],
            order: [["createdAt", "DESC"]]
        });

        return sprints;
    },
}