const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

async function updatePassword(req, res, next) {
  try {
    const sessionUser = req.userId; // The currently logged-in user (for security reasons)
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide both old and new passwords.",
      });
    }

    // Find the user based on the session
    let user = await userModel.findById(sessionUser);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found.",
      });
    }

    // Verify the old password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Old password is incorrect.",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully.",
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = updatePassword;
