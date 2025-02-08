const { Request, Response } = require("express");

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
async function errorHanlder(error, req, res, next) {
  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      error: true,
      success: false,
      message: "Something went wrong",
    });
  } else {
    return res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
}

module.exports = errorHanlder;
