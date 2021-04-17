const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const User = require("../models/User");

const sendEmail = (email, rand) => {

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
        //template: 'index'
        html: `Olá <br> Clique aqui para verificar o seu Email <br><a href=http://localhost:3333/verify?confirmationCode=${rand}>Clique aqui para a verificação</a>`,
    }

    console.log(mailOptions);

    Transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Mensagem enviada " + response.message);
        }
    });
}



const verifyEmail = async (req, res) => {

    if (req.query.confirmationCode != null ) {

        const user = await User.findOne({
            where: {
                confirmationCode: req.query.confirmationCode
            }
        })

        if(user) {
            user.isValid = true  
            user.save()
        }
        res.redirect("localhost:3000/orderconfirmemail")
    }
    else {
        console.log("Email já foi verificado");
        res.end("<h1>Bad Request</h1>");
    }
}

module.exports = { sendEmail, verifyEmail };


