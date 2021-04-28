const Invite = require("../models/Invite");
const urlSend = require('generating-url');
const User = require("../models/User");
const { sendEmail } = require("../services/emailConfirmation");
const randomstring = require("randomstring");
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

            const tokenInvite = randomstring.generate(140)

            const createInvite = await user.createInvite({
                groupId: groupId,
                inviteToken: tokenInvite
            });

            let path = urlSend.generate({
                baseUrl: 'http://localhost:3333',
                path: 'group/add/:inviteToken',
                params: {
                    token: tokenInvite
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
        const token = req.params.token
        const {userRole} = req;

        try {
            const invite = await Invite.findOne({
                where: {
                    inviteToken: token
                }
            })
            const group = await Group.findByPk(invite.groupId);

            if (!group)
                return res.status(404).send({ error: "Grupo não existe" })

            if (invite) {
                if (userRole == "teacher")
                    await group.addTeacher(invite.userId)

                if (userRole == "student")
                    await group.addStudent(invite.userId)
            }
            else {
                return res.status(404).send({ error: "Usuário não encontrado" })
            }

            res.status(200).send({
                group: {
                    userId: invite.userId,
                    groupName: group.name
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }
}