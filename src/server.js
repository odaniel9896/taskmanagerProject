const app = require("./app");
const app2 = require("./app");

const socket = require("socket.io");
const Message = require("./models/Message");


const PORT = 3333;
const PORT2 = 3002;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});

const serverWebsocket = app2.listen(PORT2, () => {
    console.log("Servidor rodando na porta 3002")
});

module.exports = serverWebsocket;

require("./socket");

// const io = socket(serverWebsocket);

// // io.on("connection", async (socket) => {
// //     console.log(socket.id);

// //     socket.on("join_room", (data) => {
// //         socket.join(data);
// //         console.log("User Joined Room: " + data);
// //     });

// //     socket.on("send_message", async (data) => {
// //         // console.log(data);
// //         // console.log(data.content.message);
// //         const message = await Message.create({
// //             text: data.content.message,
// //             userId: data.userId,
// //             groupId: data.groupId,
// //             chatId: data.chatId,
// //         });
// //         socket.to(data.room).emit("receive_message", data.content);
// //     });

// //     socket.on("disconnect", () => {
// //         console.log("USER DISCONNECTED");
// //     });

// //     socket.on("delete_message", async (data) => {

// //         const message = await Message.findOne({
// //             where: {
// //                 id: data.content.id,
// //                 userId: data.content.userId
// //             }
// //         });

// //         if (!message)
// //             return res.status(401).send({ error: "Mensagem não encontrada" })
// //         message.destroy();
// //     })
// // });

