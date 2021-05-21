const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const User = require("../models/User");
const bcrypt = require("bcryptjs");


const sendEmail = (email, url) => {
    console.log("🚀 ~ file: emailConfirmation.js ~ line 8 ~ sendEmail ~ url", url)
    console.log("🚀 ~ file: emailConfirmation.js ~ line 8 ~ sendEmail ~ email", email)

    let Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "tccemailvalidator@gmail.com",
            pass: "taskmanagerproject"
        }
    })


    Transport.use('compile', hbs({
        viewEngine: {
            partialsDir: './src/services/views/',
            defaultLayout: ""
        },
        viewPath: './src/services/views/',
        extName: ".hbs"
    }))


    const mailOptions = {
        to: email,
        subject: "Confirmação de Email",
        //template: 'index',
        html: `Olá <br> Clique aqui para realizar a verificação <br><a href=${url}>Clique aqui para a verificação</a>`,
    }

    console.log(mailOptions);

    Transport.sendMail(mailOptions, function(error, response) {
        if(error) {
            console.log(error);
        } else {
            console.log("Mensagem enviada " + response.message);
        }
    });
}



const verifyEmail = async (req, res) => {

    if(req.query.confirmationCode != null) {

        const user = await User.findOne({
            where: {
                confirmationCode: req.query.confirmationCode
            }
        })

        if(user) {
            user.isValid = true
            user.save()
        }
        res.redirect("http://192.168.0.10:3000/confirmemail")
        console.log(res.redirect)
    }
    else {
        console.log("Status atualizado");
        res.end("<h1>Bad Request</h1>");
    }
}

const passwordEmailReset = async (req, res) => {

    const {password} = req.body

    if(req.query.passwordToken != null) {

        const user = await User.findOne({
            where: {
                passwordToken: req.query.passwordToken
            }
        })

        if(user) {
            const passwordCript = bcrypt.hashSync(password);

            user.password = passwordCript
            user.save()
        }
        res.status(200).send("senha resetada")
        console.log(res.redirect)
    }
    else {
        console.log("Email já foi verificado");
        res.end("<h1>Bad Request</h1>");
    }
}

module.exports = {sendEmail, verifyEmail, passwordEmailReset};


