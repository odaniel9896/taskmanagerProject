const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email
        },
      });

      if (!user || !bcrypt.compareSync(password, user.password))
        return res.status(403).send({ error: "Usuário e/ou senha inválidos" });

      if (user.isValid == false)
        return res.status(403).send({ error: "Usuário não confirmado"});

      const token = generateToken({
        userId: user.id,
      });

      setTimeout(() => {
        res.status(201).send({
          user: {
            userId: user.id,
            email: user.email,
          },
          token,
        });
      }, 3000);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
