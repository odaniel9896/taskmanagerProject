const nodemailer = require("nodemailer");
const Student = require("../models/Student");
const rand = Math.floor((Math.random() * 100) + 54);

const sendEmail = (email) => {
    console.log(email);

    let Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "tccemailvalidator@gmail.com",
            pass: "taskmanagerproject"
        }
    })

    const mailOptions = {
        to: email,
        subject: "Confirmação de Email",
        html: `Olá <br> Clique aqui para verificar o seu Email <br><a href=http://localhost:3000/verify?id=${rand}>Clique aqui para a verificação</a>`,
    }

    console.log(mailOptions);

    Transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });
}

module.exports = { sendEmail };

// const verifyEmail = async (req, res, next) => {

//         if (req.query.id == rand) {
            
//             const student = await Student.findOne({
                
//             })

//             return next()
//         }
//         else {
//             console.log("email is not verified");
//             res.end("<h1>Bad Request</h1>");
//         }
// }
// module.exports = { verifyEmail };


