const Group = require("../../models/Group");
const Message = require("../../models/Message");

module.exports = {
    async index(req, res) {
        const groupId = req.params.groupId;

        try {
            const group = await Group.findByPk(groupId);

            if (!group)
                return res.status(401).send({ error: "Grupo não encontrado" });
            
            const message = await Message.findAll({
                where: {
                    groupId : groupId
                },
                attributes: ["text", "userId", "groupId", "chatId", "createdAt"]
            })
            res.send(message);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}