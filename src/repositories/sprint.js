const Sprint = require("../models/Sprint");

module.exports = {
    async findSprintById(sprintId) {
        const sprint = await Sprint.findByPk(sprintId);

        return sprint;
    },
}