const Invite = require("../models/Invite")

module.exports = {
    async findOneInvite(token) {
        const invite = await Invite.findOne({
            where: {
                inviteToken: token
            }
        });
        return invite;
    }
}