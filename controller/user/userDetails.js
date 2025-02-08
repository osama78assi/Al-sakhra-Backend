const userModel = require("../../models/userModel");

async function userDetailsController(req, res, next) {
  try {
    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = userDetailsController;
