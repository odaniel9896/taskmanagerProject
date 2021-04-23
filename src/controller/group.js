const Group = require("../models/Group");
const Student = require("../models/Student");
const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {

        const { userId } = req;
        console.log("index -> userId", userId)

        try {
            const groupFeed = await Group.findAll({
                attributes: [
                    "id",
                    "name",
                    "createdAt",
                ],
                include: [
                    {
                        association: "Students",
                        attributes: ["id", "name", "profileImage"],
                        through: {
                            attributes: [],
                        },

                    },
                    {
                        association: "Teachers",
                        attributes: ["id", "name", "profileImage"],
                        through: {
                            attributes: [],
                        },

                    }
                ],
                order: [["createdAt", "DESC"]],
            });

            // select * from`groups` g
            // left join teacherGroup tg  on g.id = tg.groupId
            // left join studentGroup sg  on g.id = sg.groupId
            // where tg.teacherId = 3
            // or sg.studentId = 3;
            res.send(groupFeed)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async store(req, res) {
        const { name } = req.body;
        const { userId } = req;

        try {
            const user = await User.findByPk(userId);
            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const group = await Group.create({
                name
            })


            if (user.role == "teacher")
                await group.addTeacher(user.id)

            if (user.role == "student")
                await group.addStudent(user.id)


            res.status(201).send({
                group: {
                    groupId: group.id,
                    groupName: group.name,
                }
            });


        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}