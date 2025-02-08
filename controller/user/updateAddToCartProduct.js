const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res, next) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req?.body?._id;

    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.updateOne(
      { productId: addToCartProductId, userId: currentUserId },
      {
        ...(qty ? { quantity: qty } : {}),
      }
    );

    res.json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = updateAddToCartProduct;
