const fs = require("fs");
const path = require("path");
const productModel = require("../../models/productModel");
const uploadProductPermission = require("../../helpers/permission");
const mongoose = require("mongoose");

async function DeleteProductController(req, res, next) {
  try {
    const { productId } = req.params;

    // Validate product existence
    const product = await productModel.findById(productId); // Use 'await' here
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Delete associated images from filesystem
    const deleteFiles = (filePaths) => {
      for (const filePath of filePaths) {
        try {
          // Get the file path relative to the uploads directory
          const fileToDelete = path.join(
            __dirname,
            "../../uploads/product-images",
            path.basename(filePath)
          );

          // Check if the file exists and then delete
          if (fs.existsSync(fileToDelete)) {
            fs.unlinkSync(fileToDelete);
          }
        } catch (err) {
          console.error(`Failed to delete file: ${filePath}`, err.message);
        }
      }
    };

    // Perform file cleanup if product images exist
    if (product.productImage && product.productImage.length > 0) {
      deleteFiles(product.productImage); // Delete images from the file system
    }

    // Delete product from database
    await productModel.findByIdAndDelete(productId); // Delete the product

    res.status(200).json({
      message: "Product and associated images deleted successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error(err); // Log the error
    next(err);
  }
}

module.exports = DeleteProductController;
