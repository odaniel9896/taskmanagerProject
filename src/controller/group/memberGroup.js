const Invite = require("../../models/Invite");
const urlSend = require('generating-url');
const User = require("../../models/User");
const { sendEmail } = require("../../services/emailConfirmation");
const randomstring = require("randomstring");
const Group = require("../../models/Group");
const { findUserById, createInvite } = require("../../repositories/user");
const { findOneInvite } = require("../../repositories/invite");
const { findGroupDelete } = require("../../repositories/group");

module.exports = {
    async sendInviteGroup(req, res) {

        const { userId } = req;
        const groupId = req.params.groupId;
        const { emailSend } = req.body;

        try {

            const user = await findUserById(userId)

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const tokenInvite = randomstring.generate(120);

            await createInvite(user, groupId, tokenInvite)

            let path = urlSend.generate({
                baseUrl: 'http://localhost:3000',
                path: 'group/:inviteToken/add',
                params: {
                    inviteToken: tokenInvite
                },
                query: false
            });

            const email = emailSend;
            const url = path;

            sendEmail(email, url)
            res.send("Email de convite enviado")
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async addMemberGroup(req, res) {
        const token = req.params.inviteToken
        const { userRole, userId } = req;

        try {
            const invite = await findOneInvite(token);

            const group = await Group.findByPk(invite.groupId);

            if (!group)
                return res.status(404).send({ error: "Grupo não existe" })

            if (group) {
                if (userRole == "teacher")
                    await group.addTeacher(userId)

                if (userRole == "student")
                    await group.addStudent(userId)

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

    },
    async deleteMemberGroup(req, res) {

        const { userId } = req;
        const idDeleteUser = req.params.idDeleteUser;
        const groupIdA = req.params.groupId

        try {
            const user = await findUserById(userId)

            if (!user)
                return res.status(404).send({ error: "Usuário não existe" });

            if (user.role == "teacher") {

                const group = await findGroupDelete({groupIdA, userId})

                if (group.Teachers[0].id === userId) {
                    await group.removeStudent(idDeleteUser);

                    return res.status(200).send();
                }
                else
                    return res.status(404).send({ error: "Você não faz parte desse grupo" })
            }

            else
                return res.status(404).send({ error: "Você não tem permissão para apagar um estudante do grupo" })

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}