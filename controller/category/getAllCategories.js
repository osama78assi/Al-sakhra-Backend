const categoryModel = require("../../models/categoryModel");

async function getAllCategoriesController(req, res, next) {
  try {
    // Retrieve all categories from the database
    const categories = await categoryModel.find({});

    // Check if any categories were found
    if (!categories || categories.length === 0) {
      return res.status(200).json({
        message: "No categories found",
        error: false,
        success: true,
        data: [],
      });
    }

    // Respond with the retrieved categories
    res.status(200).json({
      message: "Categories retrieved successfully",
      error: false,
      success: true,
      data: categories,
    });
  } catch (err) {
    console.log(err.message)
    next(err)
  }
}

module.exports = getAllCategoriesController;
