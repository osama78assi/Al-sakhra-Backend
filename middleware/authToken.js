const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (payload) {
      req.userId = payload._id;
      next();
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = authToken;
