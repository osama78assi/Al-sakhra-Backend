const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;

    const deleteProduct = await addToCartModel.deleteOne({
      productId: addToCartProductId,
      userId: currentUserId,
    });

    res.json({
      message: "Product Deleted From Cart",
      error: false,
      success: true,
      data: deleteProduct,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = deleteAddToCartProduct;
