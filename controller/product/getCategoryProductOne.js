const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res, next) => {
  try {
    const productCategory = await productModel.distinct(req.category);

    //array to store one product from each category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ category });

      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({
      message: req.category,
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = getCategoryProduct;
