const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PASSWORD_META } = process.env;
// const nodemailer = require("nodemailer");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const alreadyInDB = await User.findOne({ email });
  const authorized = bcrypt.compareSync(password, alreadyInDB.password);

  if (!alreadyInDB || !authorized) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }

  const payload = {
    id: alreadyInDB._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(alreadyInDB._id, { token });

  // const config = {
  //   host: "smtp.meta.ua",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: "sokorevvvladimir@meta.ua",
  //     pass: PASSWORD_META,
  //   },
  // };

  // const emailOptions = {
  //   from: "sokorevvvladimir@meta.ua",
  //   to: "sokorevvvladimir@gmail.com",
  //   subject: "Nodemailer test",
  //   text: "Привет. Мы тестируем отправку писем!",
  // };

  // const transporter = nodemailer.createTransport(config);

  // transporter
  //   .sendMail(emailOptions)
  //   .then((info) => console.log(info))
  //   .catch((err) => console.log(err));

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: alreadyInDB.subscription,
      },
    },
  });
};

module.exports = signIn;
