const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const handlebars = require("handlebars");
const fs = require("fs");

const sendEmail = (email, replacements, viewUrl) => {
  const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  let Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "tccemailvalidator@gmail.com",
      pass: "taskmanagerproject",
    },
  });

//   Transport.use(
//     "compile",
//     hbs({
//       viewEngine: {
//         partialsDir: "./src/services/views/",
//         defaultLayout: "",
//       },
//       viewPath: "./src/services/views/",
//       extName: ".hbs",
//     })
//   );

  readHTMLFile(
    __dirname + viewUrl,
    function (err, html) {
      const template = handlebars.compile(html);

      const htmlToSend = template(replacements);

      const mailOptions = {
        to: email,
        subject: "Confirmação de Email",
        //template: 'index',
        html: htmlToSend,
      };

      Transport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Mensagem enviada " + response.message);
        }
      });
    }
  );
};

const verifyEmail = async (req, res) => {
  if (req.query.confirmationCode != null) {
    const user = await User.findOne({
      where: {
        confirmationCode: req.query.confirmationCode,
      },
    });

    if (user) {
      user.isValid = true;
      user.save();
    }
    res.redirect("http://192.168.0.10:3000/confirmemail");
    console.log(res.redirect);
  } else {
    console.log("Status atualizado");
    res.end("<h1>Bad Request</h1>");
  }
};

const passwordEmailReset = async (req, res) => {
  const { password } = req.body;

  const user = await User.findOne({
    where: {
      passwordToken: req.query.passwordToken,
    },
  });

  if (user) {
    const passwordCript = bcrypt.hashSync(password);

    user.password = passwordCript;
    user.save();
  }
  res.status(200).send("senha resetada");
  console.log(res.redirect);
};

module.exports = { sendEmail, verifyEmail, passwordEmailReset };
