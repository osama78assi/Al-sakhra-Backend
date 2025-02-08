const Goal = require("../../../models/landingPageModels/goal");

async function getGoalsController(req, res, next) {
  try {
    const goals = await Goal.find(); // Fetch all goals from the database

    res.status(200).json({
      data: goals,
      success: true,
      error: false,
      message: "Goals fetched successfully!",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = getGoalsController;
