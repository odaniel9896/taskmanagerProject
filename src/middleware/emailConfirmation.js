const nodemailer = require("nodemailer");
const Student = require("../models/Student");
const rand = Math.floor((Math.random() * 100) + 54);

const sendEmail = (email) => {

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
        html: `Olá <br> Clique aqui para verificar o seu Email <br><a href=http://localhost:3333/verify?id=${rand}&email=${email}>Clique aqui para a verificação</a>`,
    }

    //verifyEmail(email)

    console.log(mailOptions);

    Transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
    });
}



const verifyEmail = async (req, res) => {

    if (req.query.id == rand) {

        const student = await Student.findOne({
            where: {
                email: req.query.email
            }
        })

        if(student) {
            student.isValid = true
            student.save()

        }
    }
    else {
        console.log("Email não verificado");
        res.end("<h1>Bad Request</h1>");
    }
}

module.exports = { sendEmail, verifyEmail };


