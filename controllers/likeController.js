const Post = require("../models/Post");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../middleware/CustomError");
const User = require("../models/User");

const likePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  const user = await User.findById(userId);

  if (!post || !user) {
    const err = new CustomError("Not Found", 404);

    return next(err);
  }

  if (post.likes.includes(userId)) {
    const err = new CustomError("You have already liked this post", 401);

    return next(err);
  }

  post.likes.push(user);
  await post.save();

  res.status(200).json({ success: true, msg: "Post liked" });
});

const unlikePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  const user = await User.findById(userId);

  if (!post || !user) {
    const err = new CustomError("Not Found", 404);

    return next(err);
  }

  if (!post.likes.includes(userId)) {
    const err = new CustomError("You have not liked this post", 401);

    return next(err);
  }

  post.likes.remove(user);
  await post.save();

  res.status(200).json({ success: true, msg: "Post UnLiked" });
});

module.exports = {
  likePost,
  unlikePost,
};
