const Goal = require("../../models/landingPageModels/goal");

async function deleteGoalController(req, res, next) {
  try {
    const goalId = req.params.id; // Get the goal ID from the request URL

    // Check if the goal ID is provided
    if (!goalId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide a goal ID to delete."
      });
    }

    // Find the goal by ID
    const goalToDelete = await Goal.findById(goalId);

    // Check if the goal exists
    if (!goalToDelete) {
      return res.status(404).json({
        message: "Goal not found",
        error: true,
        success: false,
      });
    }

    // Delete the goal document from the database
    await Goal.findByIdAndDelete(goalId);

    res.status(200).json({
      message: "Goal deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = deleteGoalController;