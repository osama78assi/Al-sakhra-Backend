const uploadProductPermission = require("../../helpers/permission");
const categoryModel = require("../../models/categoryModel");

async function addCategoryController(req, res, next) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Permission denied",
      });
    }

    // Extract and validate category data from request body
    const { categoryName } = req.body;

    const newCategory = new categoryModel({ categoryName });

    const validationError = newCategory.validateSync();
    if (validationError) {
      const errors = validationError.errors.map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: true,
        message: `Validation failed: ${errors.join(", ")}`,
      });
    }

    // Check for duplicate category name
    const existingCategory = await categoryModel.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "A category with this name already exists",
      });
    }

    // Save the new category
    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      error: false,
      success: true,
      data: savedCategory,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    next(err);
  }
}

module.exports = addCategoryController;
