const Group = require("../models/Group");
const Student = require("../models/Student");
const User = require("../models/User");
const Teacher = require("../models/Teacher");

module.exports = {
    async index(req, res) {

        const { userId, userRole } = req;

        try {

            let userGroup;


            if (userRole == "teacher")
                userGroup = Teacher
            else
                userGroup = Student

            // if(userRole == "teacher")    

            const findGroupUser = await userGroup.findByPk(userId, {
                include: [
                    {
                        association: "Groups",
                        attributes: ["id", "name"],
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
                        ]
                    },

                ],
            })


            // if (!findGroupUser)
            //     return res.status(403).send({ error: "Nenhum usuário encontrado" });

            // const findGroup = await findGroupUser.getGroups({ through: { attributes: [] } });

            // select * from`groups` g
            // left join teacherGroup tg  on g.id = tg.groupId
            // left join studentGroup sg  on g.id = sg.groupId
            // where tg.teacherId = 3
            // or sg.studentId = 3;
            res.send(findGroupUser.Groups);
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