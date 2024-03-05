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

const getAllFollowers = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate("followers");

  if (!user) {
    const err = new CustomError("User not found", 404);

    return next(err);
  }

  const followers = user.followers.map((follower) => {
    // Now each follower will be the full user object
    return {
      _id: follower._id,
      username: follower.username,
      name: follower.name,
    };
  });
  res.status(200).json({ success: true, followers });
});

const getAllFollowing = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate("following");

  if (!user) {
    const err = new CustomError("User not found", 404);

    return next(err);
  }

  if (userId === req.user._id.toString()) {
    const err = new CustomError("Not Allowed", 401);

    return next(err);
  }

  const following = user.following.map((following) => {
    // Now each follower will be the full user object
    return {
      _id: following._id,
      username: following.username,
      name: following.name,
    };
  });
  res.status(200).json({ success: true, following });
});

module.exports = {
  followUser,
  unFollowUser,
  getAllFollowers,
  getAllFollowing,
};
