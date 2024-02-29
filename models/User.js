const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username field is required"],
    unique: [true, "Username already exists"],
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [30, "Username cannot exceed 30 characters"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must at least contain 8 characters"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: [true, "Email already exists"],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  name: {
    type: String,
    required: [true, "Name field is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [160, "Bio cannot exceed 160 characters"],
  },
  profilePicture: {
    type: String,
    default: "default.jpg", // Default profile picture
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

// Indexes for efficient querying
userSchema.index({ username: 1, email: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
