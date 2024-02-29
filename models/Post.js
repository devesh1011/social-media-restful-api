const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    maxlength: [1000, "Content cannot exceed 1000 characters"],
  },
  image: {
    type: String,
    trim: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
