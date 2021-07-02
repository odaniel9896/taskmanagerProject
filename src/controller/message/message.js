const Chat = require("../../models/Chat");
const Group = require("../../models/Group");
const Message = require("../../models/Message");
const User = require("../../models/User");

module.exports = {
  async index(req, res) {
    const chatId = req.params.chatId;

    const {userId} = req;
    console.log(userId)

    try {
      const group = await Chat.findByPk(chatId);

      if (!group) return res.status(401).send({ error: "Chat não encontrado" });

      const message = await Message.findAll({
        where: {
          chatId: chatId,
        },
        attributes: ["id", "message", "userId", "groupId", "chatId", "createdAt"],
        include: [
          {
            association: "User",
            attributes: ["id", "role"],
            include : [
                {
                    association : "Teacher",
                    attributes: ["id", "name"],
                },
                {
                    association : "Student",
                    attributes: ["id", "name" ],
                }
            ]
          },
        ],
        order: [["createdAt", "ASC"]],
      });
      res.send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
