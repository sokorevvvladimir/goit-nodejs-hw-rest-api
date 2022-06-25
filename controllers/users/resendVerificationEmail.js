const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    const error = new Error("Missing required field email");
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({ email });

  if (user.verify) {
    const error = new Error("Verification has already been passed");
    error.status = 400;
    throw error;
  }

  const msg = {
    to: email,
    subject: "Email verification",
    text: "Please, verify your email",
    html: `<h3>Please, <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">verify</a> your email</h3>`,
  };

  await sendEmail(msg);

  res.status(200).json({
    status: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerificationEmail;
