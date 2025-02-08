const productModel = require("../../models/productModel");

const searchProduct = async (req, res, next) => {
  try {
    const query = req.query.q;

    const regex = new RegExp(`.*${query}.*`, "i");

    const product = await productModel.find({
      name: {
        $elemMatch: {
          text: { $regex: regex }, // Match all occurrences of the regex in the `text` field
        },
      },
    });

    res.json({
      data: product,
      message: "Search Product list",
      error: false,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = searchProduct;
