const Group = require("../models/Group");

module.exports = {
    async findGroupById(groupId) {
        
        const group = await Group.findByPk(groupId);

        return group;
    },
    async findGroupWorkspace(groupId) {
        const group = await Group.findByPk(groupId, {
            attributes: ["id", "name"],
            include: [
                {
                    association: "Workspace",
                    attributes: ["id", "name"],
                }
            ]
        });
        return group;
    }
}