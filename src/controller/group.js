const Group = require("../models/Group");
const Student = require("../models/Student");
const User = require("../models/User");

module.exports = {
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
                await group.addTeacher({
                    teacherId: user.id
            })
            if (user.role == "student")
             await group.addStudent(
                student.id
            )  

            console.log({studentId: student.id})

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