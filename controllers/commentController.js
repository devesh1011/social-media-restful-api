const Comment = require("../models/Comment");
const CustomError = require("../middleware/CustomError");
const asyncHandler = require("../utils/asyncHandler");
const Post = require("../models/Post");

const getPostComments = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);

  if (!post) {
    const err = new CustomError("Post not found", 404);
    return next(err);
  }

  const postComments = post.comments.map((comment) => {
    return {
      _id: comment._id,
      content: comment.content,
      user: comment.user,
    };
  });
  res.status(201).json({ success: true, postComments });
});

const newPostComment = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    const err = new CustomError("Post not found", 404);
    return next(err);
  }

  const comment = new Comment({
    user: req.user,
    post: postId,
    content,
  });

  await comment.save();

  res.status(201).json({ success: true, message: "Comment added" });
});

const updatePostComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  await Comment.findByIdAndUpdate(commentId, {
    content,
  });

  res.status(201).json({ success: true, message: "Comment Updated" });
});

const deletePostComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  await Comment.findByIdAndDelete(commentId);

  res.status(201).json({ success: true, message: "Comment Deleted" });
});

module.exports = {
  getPostComments,
  newPostComment,
  updatePostComment,
  deletePostComment,
};
