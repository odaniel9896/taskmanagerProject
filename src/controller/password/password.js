const { findUserByEmail } = require("../../repositories/user");
const { sendEmail } = require("../../services/emailConfirmation");

module.exports = {
  async sendEmailPassword(req, res) {
    const email = req.params.email;

    try {
      let user = await findUserByEmail(email);
      console.log(user);

      if (!user) return res.status(404).send({ error: "Usuário não existe" });

      const token = user.passwordToken;

      const url = `https://tecnotcc.herokuapp.com/passwordreset?passwordToken=${token}`;

      const replacements = {
        email: email,
        url: url,
      };

      const viewUrl = "/views/RedefinePassword/index.html";

      sendEmail(email, replacements, viewUrl);
      res.send("Email enviado");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
