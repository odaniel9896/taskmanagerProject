const Group = require("../models/Group");
const Student = require("../models/Student");
const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
        try {
            const groupFeed = await Group.findAll({
                attributes: [
                    "id",
                    "name",
                    "createdAt",
                ],
                include: [
                    {
                        association: "Student",
                        attributes: ["id", "name", "profileImage"],
                        through: { attributes: [] },
                        include: {
                            association: "User",
                            attributes: ["id"],
                        },
                    },
                    {
                        association: "Teacher",
                        attributes: ["id", "name", "profileImage"],
                        through: { attributes: [] },
                        include: {
                            association: "Student",
                            attributes: ["id"],
                        },
                    }
                ],
                order: [["createdAt", "DESC"]],
            });
            res.send(groupFeed)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async store(req, res) {
        const { name } = req.body;
        const id = req.query.id;

        try {
            const user = await User.findByPk(id);
            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const group = await Group.create({
                name
            })

            const student = await Student.findOne({
                where: {
                    userId: user.id
                }
            })
            if (!student)
                return res.status(404).send({ error: "Student não encontrado" });

            if (user.role == "teacher")
                await group.addTeacher(teacher.id)

            if (user.role == "student")
                await group.addStudent(student.id)


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