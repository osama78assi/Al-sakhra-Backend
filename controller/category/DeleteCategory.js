const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
const mongoose = require("mongoose")

async function deleteCategoryController(req, res, next) {
  try {
    const { id } = req.body;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
        error: true,
        success: false,
      });
    }

    // Delete the category
    const deletedCategory = await categoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
        error: true,
        success: false,
      });
    }

    // Delete related products
    await productModel.deleteMany({ category: id });

    res.status(200).json({
      message: "Category and associated products deleted successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = deleteCategoryController;
