const fs = require("fs").promises;
const path = require("path");
const { User } = require("../../models");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
  const { avatarURL, _id } = req.user;
  const avatarName = `${_id}_${originalname}`;
  const newAvatarPath = path.join("public", "avatars", avatarName);

  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await Jimp.read(tempUpload)
      .then((avatar) => {
        return avatar.resize(250, 250).write(tempUpload);
      })
      .catch((error) => {
        throw error;
      });
    await fs.rename(tempUpload, resultUpload);
    await User.findByIdAndUpdate(_id, { avatarURL: newAvatarPath });
    res.status(200).json({
      status: 200,
      data: { avatarURL: newAvatarPath },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
