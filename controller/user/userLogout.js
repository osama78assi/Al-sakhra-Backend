async function userLogout(req, res, next) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = userLogout;
