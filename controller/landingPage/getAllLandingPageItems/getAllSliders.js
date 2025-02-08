const Slider = require("../../../models/landingPageModels/slider");

async function getAllSlidersController(req, res, next) {
  try {
    // Retrieve all sliders from the database
    const sliders = await Slider.find();

    // Check if there are any sliders
    if (!sliders.length) {
      return res.status(404).json({
        data: [],
        message: "No sliders found",
        error: false,
        success: true,
      });
    }

    // Return the sliders
    res.status(200).json({
      data: sliders,
      success: true,
      error: false,
      message: "Sliders retrieved successfully!",
    });
  } catch (err) {
    console.log(err.message);
    next(err)
  }
}

module.exports = getAllSlidersController;
