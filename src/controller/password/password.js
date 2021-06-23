const { findUserByEmail } = require("../../repositories/user");
const { sendEmail } = require("../../services/emailConfirmation");

module.exports = {
    async sendEmailPassword(req, res) {
        const email = req.params.email;

        try {
            let user = await findUserByEmail(email);

            if(!user)
                return res.status(404).send({error: "Usuário não existe"})

            const token = user.passwordToken;
            
            const url = `https://tecnotcc.netlify.app/passwordreset?passwordToken=${token}`
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