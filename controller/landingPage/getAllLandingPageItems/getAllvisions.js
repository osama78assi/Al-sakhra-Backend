const Vision = require("../../../models/landingPageModels/vision");

async function getAllVisionsController(req, res, next) {
  try {
    // Fetching all visions from the database
    const visions = await Vision.find(); // Optionally, you can add sorting, pagination, etc.

    // Check if visions exist
    if (!visions.length) {
      return res.status(404).json({
        message: "No visions found.",
        success: true,
        error: false,
        data: [],
      });
    }

    // Sending successful response with fetched visions
    res.status(200).json({
      data: visions,
      success: true,
      error: false,
      message: "Visions retrieved successfully!",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = getAllVisionsController;
