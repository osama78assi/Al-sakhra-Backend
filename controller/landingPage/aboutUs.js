const AboutUs = require("../../models/landingPageModels/aboutUs");

async function addAboutUsController(req, res, next) {
  try {
    const { title, content, image } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Please provide a content",
        success: false,
        error: true,
      });
    }

    if (!title) {
      return res.status(400).json({
        message: "Please provide a title",
        success: false,
        error: true,
      });
    }

    if (!image) {
      return res.status(400).json({
        message: "Please provide an image",
        success: false,
        error: true,
      });
    }

    const existingAboutUs = await AboutUs.findOne({ content });
    if (existingAboutUs) {
      return res.status(400).json({
        message: "About Us page already exists.",
        success: true,
        error: false,
        data: [],
      });
    }

    const aboutUsData = new AboutUs({
      title,
      content,
      image,
    });

    const savedAboutUs = await aboutUsData.save();

    res.status(201).json({
      data: savedAboutUs,
      success: true,
      error: false,
      message: "About Us page added successfully!",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = addAboutUsController;
