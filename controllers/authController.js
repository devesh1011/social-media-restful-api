const {
  genPassword,
  comparePassword,
  issueToken,
} = require("../utils/passwordUtils");
const User = require("../models/User");
const handleError = require("../middleware/errorHandler");

const register = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    const hashedPassword = await genPassword(password);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      name,
    });

    const token = issueToken(newUser);

    res.json({ success: true, user: newUser, token });
  } catch (error) {
    handleError(error, res, error.message);
  }
};

const login = async (req, res) => {};

const logout = async (req, res) => {};

const refresh = async (req, res) => {};

module.exports = {
  refresh,
  register,
  login,
  logout,
};
