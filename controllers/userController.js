const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const CustomError = require("../middleware/CustomError");

const userProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(201).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {});

const deleteUserProfile = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(201).json({ msg: "User deleted" });
};

module.exports = {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
};
