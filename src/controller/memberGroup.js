const Invite = require("../models/Invite");
const urlSend = require('generating-url');
const User = require("../models/User");
const { sendEmail } = require("../services/emailConfirmation");
const Teacher = require("../models/Teacher");
const { use } = require("../routes");
const Student = require("../models/Student");
const Group = require("../models/Group");


module.exports = {
    async sendInviteGroup(req, res) {

        const { userId } = req;
        const groupId = req.params.groupId;
        const { emailSend } = req.body;

        try {

            const user = await User.findByPk(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const createInvite = await user.createInvite({
                groupId: groupId,
            });

            let path = urlSend.generate({
                baseUrl: 'http://localhost:3333',
                path: 'group/member/add/:groupId/:userEmail',
                params: {
                    groupId: groupId,
                    userEmail: emailSend
                },
                query: false
            });

            const email = emailSend
            const url = path;

            sendEmail(email, url)
            res.send("Email de convite enviado")
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async addMemberGroup(req, res) {
        const groupId = req.params.groupId
        const userEmail = req.params.userEmail

        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            const group = await Group.findByPk(groupId);

            if (!group)
                return res.status(404).send({ error: "Grupo não existe" })

            if (user) {
                if (user.role == "teacher")
                    await group.addTeacher(user.id)

                if (user.role == "student")
                    await group.addStudent(user.id)
            }
            else {
                return res.status(404).send({ error: "Usuário não encontrado" })
            }

            res.status(200).send({
                group: {
                    userId: user.id,
                    groupName: group.name
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }
}