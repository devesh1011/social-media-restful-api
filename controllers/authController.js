const {
  genPassword,
  comparePassword,
  issueToken,
} = require("../utils/passwordUtils");
const User = require("../models/User");
const CustomError = require("../middleware/CustomError");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res, next) => {
  const { username, password, email, name } = req.body;

  const hashedPass = await genPassword(password);

  const user = await User.findOne({ username });

  if (user) {
    const err = new CustomError("user already exists", 401);

    return next(err);
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPass,
    name,
  });

  const token = await issueToken(newUser);

  res.send({ newUser, token });
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const err = new CustomError("User does not exists!", 404);
    next(err);
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    const err = new CustomError("Enter a valid password", 401);
    next(err);
  }

  const token = await issueToken(user);

  res.status(200).json({ success: true, token });
});

const logout = async (req, res) => {};

const refresh = async (req, res) => {};

module.exports = {
  refresh,
  register,
  login,
  logout,
};
