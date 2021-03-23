const jwt = require("jsonwebtoken");
const auth = require("./config/auth");

const generateToken = (payload) => {
  return jwt.sign(payload, auth.secret, {
    expiresIn: "200h",
  });
};

module.exports = { generateToken };
