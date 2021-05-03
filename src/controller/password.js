const User = require("../models/User");
const { sendEmail } = require("../services/emailConfirmation");

module.exports = {
    async sendEmailPassword(req, res) {
        const email = req.params.email;

        try {
            let user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user)
                return res.status(404).send({error: "Usuário não existe"})

            const token = user.passwordToken;
            
            const url = `http://localhost:3333/passwordreset?passwordToken=${token}`
            sendEmail(
                email,
                url
            )
            res.send("Email enviado")
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
} 