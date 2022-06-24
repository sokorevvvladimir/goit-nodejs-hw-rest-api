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

// const msg = {
//   to: "sokorevvvladimir@gmail.com",
//   from: "sokorevvvladimir@meta.ua",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

module.exports = sendEmail;
