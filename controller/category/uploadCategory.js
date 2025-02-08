const uploadProductPermission = require("../../helpers/permission");
const categoryModel = require("../../models/categoryModel"); // The Category model

async function uploadCategoryController(req, res, next) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Permission denied",
      });
    }

    const { categoryName } = req.body;

    let existingCategory = false;

    // Check for duplicate category names
    for (let i = 0; i < 3; ++i) {
      const isExist = await categoryModel.findOne({
        categoryName: {
          $elemMatch: { text: categoryName[i].text },
        },
      });
      existingCategory = existingCategory || isExist;
    }

    if (existingCategory) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Category already exists",
      });
    }

    // Create a new category
    const newCategory = new categoryModel({
      categoryName,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category uploaded successfully",
      error: false,
      success: true,
      data: savedCategory,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = uploadCategoryController;
