const signUp = require("./signUp");
const signIn = require("./signIn");
const getCurrent = require("./getCurrent");
const logOut = require("./logOut");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
  signUp,
  signIn,
  getCurrent,
  logOut,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
};
