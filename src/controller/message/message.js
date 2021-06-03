const Chat = require("../../models/Chat");
const Group = require("../../models/Group");
const Message = require("../../models/Message");

module.exports = {
    async index(req, res) {
        const chatId = req.params.chatId;

        try {
            const group = await Chat.findByPk(chatId);

            if (!group)
                return res.status(401).send({ error: "Chat não encontrado" });
            
            const message = await Message.findAll({
                where: {
                    chatId : chatId
                },
                attributes: ["message", "userId", "groupId", "chatId", "createdAt"],
                order: [["createdAt", "ASC"]]
            })
            res.send(message);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}