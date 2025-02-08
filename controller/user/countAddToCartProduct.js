const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res, next) => {
  try {
    const userId = req.userId;

    const count = await addToCartModel.countDocuments({
      userId: userId,
    });

    res.json({
      data: {
        count: count,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = countAddToCartProduct;
