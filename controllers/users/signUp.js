const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const { v4 } = require("uuid");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const alreadyInDB = await User.findOne({ email });

  if (alreadyInDB) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const msg = {
    to: email,
    subject: "Email verification",
    text: "Please, verify your email",
    html: `<h3>Please, <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">verify</a> your email</h3>`,
  };

  await sendEmail(msg);

  res.status(201).json({
    status: 201,
    user: {
      email,
      subscription: "starter",
      verificationToken,
    },
  });
};

module.exports = signUp;
