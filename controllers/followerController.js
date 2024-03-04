const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../middleware/CustomError");

const followUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const followerId = req.user._id;

  if (userId === followerId.toString()) {
    const err = new CustomError("You cannot follow your account", 400);

    return next(err);
  }

  const userToFollow = await User.findById(userId);
  const follower = await User.findById(followerId);

  if (!userToFollow || !follower) {
    const err = new CustomError("User not found", 404);

    return next(err);
  }

  if (follower.following.includes(userId)) {
    const err = new CustomError("You are already following this account", 400);

    return next(err);
  }

  follower.following.push(userId);
  await follower.save();

  userToFollow.followers.push(followerId);
  await userToFollow.save();

  res
    .status(200)
    .json({ success: true, message: "You are now following this user" });
});

const unFollowUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const followerId = req.user._id;
  console.log(followerId);

  if (userId === followerId.toString()) {
    const err = new CustomError("You cannot unFollow your account", 400);

    return next(err);
  }

  const userToUnFollow = await User.findById(userId);
  const follower = await User.findById(followerId);

  if (!userToUnFollow || !follower) {
    const err = new CustomError("User not found", 404);

    return next(err);
  }

  if (!follower.following.includes(userId)) {
    const err = new CustomError("You are not following this account", 400);

    return next(err);
  }

  follower.following.remove(userId);
  await follower.save();

  userToUnFollow.followers.remove(followerId);
  await userToUnFollow.save();

  res
    .status(200)
    .json({ success: true, message: "You have unFollowed this user" });
});

const getAllFollowers = async (req, res) => {};

const getAllFollowing = async (req, res) => {};

module.exports = {
  followUser,
  unFollowUser,
  getAllFollowers,
  getAllFollowing,
};
