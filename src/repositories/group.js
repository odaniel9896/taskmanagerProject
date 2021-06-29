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
    },
    async findGroupByPykStudentOrTeacher(userGroup, userId) {
        const findGroupUser = await userGroup.findByPk(userId, {
            include: [
                {
                    association: "Groups",
                    attributes: ["id", "name", "image"],
                    through: { attributes: [] },
                    include: [
                        {
                            association: "Students",
                            attributes: ["id", "name"],
                            through: { attributes: [] }
                        },
                        {
                            association: "Teachers",
                            attributes: ["id", "name"],
                            through: { attributes: [] }
                        },
                        {
                            association: "Chat",
                            attributes: ["id"],
                        }
                    ]
                },

            ],
        });

        return findGroupUser;
    },
    async createGroup(name, req) {
        const group = await Group.create({
            name,
            image: req.file ? req.file.firebaseUrl : null
        });
        return group
    },
    async findGroupDelete({groupIdA, userId}) {
        const group = await Group.findByPk(groupIdA, {
            attributes: [
                "id",
                "name",
            ],
            include: [
                {
                    association: "Teachers",
                    attributes: ["id", "name"],
                    where: {
                        id: userId,
                    },
                    through: { attributes: [] }
                },
            ],
        });
        return group
    } 
}