const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOption = {
        httpOnly: true,
      };

      delete user.password;

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully",
        data: user,
        success: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please check Password",
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = userSignInController;
