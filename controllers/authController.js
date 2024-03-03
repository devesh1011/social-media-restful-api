const {
  genPassword,
  comparePassword,
  issueToken,
} = require("../utils/passwordUtils");
const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { username, password, email, name } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const err = new Error("User already exists");
      err.status = err.status || "error";
      err.statusCode = 401;

      next(err);
    }
    const hashedPass = await genPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
      name,
    });

    res.send(newUser);
  } catch (error) {
    next(error);
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
