const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

const sendEmail = async (data) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const email = { ...data, from: "sokorevvvladimir@meta.ua" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendEmail;
