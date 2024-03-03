const mongoose = require("mongoose");

const connectDB = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Something went wrong while connecting to MongoDB");
  }
};

module.exports = connectDB;
