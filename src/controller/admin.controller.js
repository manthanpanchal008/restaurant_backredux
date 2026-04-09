const User = require("../model/user.model");

// ✅ GET ALL USERS (Super Admin Only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ MAKE ADMIN
const makeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );

    res.json({
      success: true,
      message: "User promoted to admin",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ REMOVE ADMIN (BACK TO USER)
const removeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "user" },
      { new: true }
    );

    res.json({
      success: true,
      message: "Admin removed",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  makeAdmin,
  removeAdmin,
};