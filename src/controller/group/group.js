const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const { findGroupByPykStudentOrTeacher, createGroup, findGroupById } = require("../../repositories/group");
const { findUserById } = require("../../repositories/user");

module.exports = {
    async index(req, res) {

        const { userId, userRole } = req;

        try {

            let userGroup;

            if (userRole == "teacher")
                userGroup = Teacher
            else
                userGroup = Student

            const findGroupUser = await findGroupByPykStudentOrTeacher(userGroup, userId)

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
            const user = await findUserById(userId)

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const group = await createGroup(name);

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
    },
    async delete(req, res) {

        const { userId } = req;
        const groupId = req.params.id;

        try {

            const user = await findUserById(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não existe" });

            const group = await findGroupById(groupId);

            if (!group)
                return res.status(404).send({ error: "Grupo não encontrado" });

            await group.destroy();

            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async update(req, res) {

        const { userId } = req;

        const groupId = req.params.id;

        const { name } = req.body;

        try {

            const user = await findUserById(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não existe" });

            const group = await findGroupById(groupId);

            if (!group)
                return res.status(404).send({ error: "Grupo não encontrado" });

            group.name = name;
            group.save();

            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}