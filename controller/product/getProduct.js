const productModel = require("../../models/productModel");

const getProductController = async (req, res, next) => {
  try {
    const allProduct = await productModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All Product",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = getProductController;
