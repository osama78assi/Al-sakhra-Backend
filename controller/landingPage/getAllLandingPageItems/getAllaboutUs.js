const AboutUs = require("../../../models/landingPageModels/aboutUs");

async function getAllAboutUsController(req, res, next) {
  try {
    // Fetch all About Us documents from the database
    const aboutUsList = await AboutUs.find();

    // Check if there are any About Us entries
    if (aboutUsList.length === 0) {
      return res.status(404).json({
        success: true,
        error: false,
        message: "No About Us entries found.",
        data: [],
      });
    }

    // Return the list of About Us entries
    res.status(200).json({
      success: true,
      error: false,
      data: aboutUsList,
      message: "About Us entries retrieved successfully!",
    });
  } catch (err) {
    // Handle any errors that may occur during database interaction
    console.log(err.message);
    next(err);
  }
}

module.exports = getAllAboutUsController;
