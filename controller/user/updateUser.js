const uploadProductPermission = require("../../helpers/permission");
const userModel = require("../../models/userModel");

async function updateUser(req, res, next) {
  try {
    const sessionUser = req.userId;

    const { userId, email, name, role } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    if (!uploadProductPermission(userId)) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Can't change role because you are not admin",
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    res.json({
      data: updateUser,
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = updateUser;
