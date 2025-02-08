const productModel = require("../../models/productModel");

const filterProductController = async (req, res, next) => {
  try {
    const categoryList = req?.body?.category || [];

    const product = await productModel.find({
      category: {
        $in: categoryList,
      },
    });

    res.json({
      data: product,
      message: "product",
      error: false,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = filterProductController;
