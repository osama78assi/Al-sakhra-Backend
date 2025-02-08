const userModel = require("../../models/userModel");

async function allUsers(req, res, next) {
  try {
    const allUsers = await userModel.find();
    res.json({
      message: "All User ",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = allUsers;
