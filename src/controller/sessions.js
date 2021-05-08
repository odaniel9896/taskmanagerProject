const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const User = require("../models/User");
const auth = require("../config/auth");

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
        return res.status(403).send({ error: "Usuário não confirmado" });




      const token = generateToken({
        userId: user.id,
        userRole: user.role,
        userEmail: user.email
      });

      res.status(201).send({
        user: {
          userId: user.id,
          email: user.email,
        },
        token,
      });

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
