const userModel = require("../../models/userModel");

async function changeUserName(req, res, next) {
  try {
    const sessionUser = req.userId; // The currently logged-in user
    const { newName } = req.body;

    if (!newName) {
      return res
        .status(400)
        .json({
          error: true,
          success: false,
          message: "Please provide the new name.",
        });
    }

    // Update the user's name
    const user = await userModel.findByIdAndUpdate(
      sessionUser,
      { name: newName },
      { new: true }
    );

    res.status(200).json({
      message: "Name updated successfully.",
      data: user,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = changeUserName;
