const Post = require("../models/Post");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../middleware/CustomError");

const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({});

  if (!posts) {
    const err = new CustomError("No Posts yet");

    return next(err);
  }

  res.status(201).json({
    success: true,
    posts,
  });
});

const getPostById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    const err = new CustomError("Post not found", 404);

    return next(err);
  }

  res.status(201).json({ success: true, post });
});

const createPost = asyncHandler(async (req, res, next) => {
  const { content, image } = req.body;

  const post = Post({
    user: req.user,
    content,
    image,
  });

  const savedPost = await post.save();

  res.status(201).json({ success: true, msg: "Post have been added" });
});

const updatePost = asyncHandler(async (req, res) => {});

const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    const err = new CustomError("Post not found", 404);

    return next(err);
  }

  post.deleteOne();

  res.status(201).json({ success: true, msg: "Post removed" });
});

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
