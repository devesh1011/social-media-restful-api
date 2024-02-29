const {
  register,
  login,
  logout,
  refresh,
} = require("../controllers/authController");

const router = require("express").Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/logout", logout)
  .post("/refresh", refresh);

module.exports = router;
