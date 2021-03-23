
const nodemailer = require("nodemailer");

const rand = Math.floor((Math.random() * 100) + 54);

module.exports = {
    
    async sendEmail(req, res){

        const { email } = req.body;
    
        let Transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "tccemailvalidator@gmail.com",
                pass: "taskmanagerproject"
            }
        })
    
        
    
        const host = req.get('host');
    
        const link = "http://" + req.get('host') + "/verify?id=" + rand;
    
        const mailOptions = {
            to: email,
            subject: "CONFIRME ESSA MERDA AI ",
            html: "Olá,<br> Clique aqui para verificar o seu Email <br><a href=" + link + ">Clique aqui para a verificação</a>"
        }
    
        console.log(mailOptions);
    
        Transport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                console.log("Message sent: " + response.message);
                res.end("Email enviado para: " + email);
            }
        });
    },
    async verifyEmail(req, res, next){

        const { email } = req.body;
    
        const host = req.get('host');
    
        const link = "http://" + req.get('host') + "/verify?id=" + rand;
    
        const mailOptions = {
            to: email,
            subject: "CONFIRME ESSA MERDA AI ",
            html: "Olá,<br> Clique aqui para verificar o seu Email <br><a href=" + link + ">Clique aqui para a verificação</a>"
        }
    
    
        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            if (req.query.id == rand) {
                console.log("email is verified");
                res.end("<h1>Email " + email + " is been Successfully verified");

                return next()
            }
            else {
                console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
        }
        else {
            res.end("<h1>Request is from unknown source");
        }


    }
}

