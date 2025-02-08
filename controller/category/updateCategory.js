const uploadProductPermission = require("../../helpers/permission");
const categoryModel = require("../../models/categoryModel");

async function updateCategoryController(req, res, next) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Permission denied" });
    }

    const { categoryId, categoryName } = req.body;

    // Find the category by ID
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: true, message: "Category not found" });
    }

    category.categoryName = categoryName;

    const updatedCategory = await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      error: false,
      success: true,
      data: updatedCategory,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = updateCategoryController;
