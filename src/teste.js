// const Message = require("./models/Message");

// module.exports = {
//     async test(socket){
//         socket.on("send_message", async (data) => {
//             // console.log(data);
//             // console.log(data.content.message);
//                 const message = await Message.create({
//                     text: data.content.message,
//                     userId: data.userId,
//                     groupId: data.groupId,
//                     chatId: data.chatId,
//                 });
//                 socket.to(data.room).emit("receive_message", data.content);
//                 return message;
//         }); 
//     }
// }


//TESTE DE SPERAÇÃO DE ARQUIVO
