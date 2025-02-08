const userModel = require("../../models/userModel");

async function changeUserEmail(req, res, next) {
  try {
    const sessionUser = req.userId; // The currently logged-in user
    const { newEmail } = req.body;

    if (!newEmail) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Please provide the new email.",
      });
    }

    // Check if the new email already exists
    const emailExists = await userModel.findOne({ email: newEmail });

    if (emailExists) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "This email is already in use.",
      });
    }

    // Update the user's email
    const user = await userModel.findByIdAndUpdate(
      sessionUser,
      { email: newEmail },
      { new: true }
    );

    res.status(200).json({
      message: "Email updated successfully.",
      data: user,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = changeUserEmail;
