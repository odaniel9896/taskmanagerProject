const socket = require("socket.io");
const Message = require("./models/Message");
const server = require("./server");

const io = socket(server);

io.on("connection", async (socket) => {

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", async (data) => {
            const message = await Message.create({
                message: data.message,
                userId: data.userId,
                groupId: data.groupId,
                chatId: data.chatId,
                createdAt: data.createdAt,
            });
            socket.to(data.chatId).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
    });

    socket.on("delete_message", async (data) => {

        const message = await Message.findOne({
            where: {
                id : data.content.id,
                userId : data.content.userId
            }
        });

        if(!message)
            return res.status(401).send({ error: "Mensagem não encontrada"})
        message.destroy();    
    })
});

module.exports = io;