const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: [true, "Post ID is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    maxlength: [300, "Content cannot exceed 300 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
