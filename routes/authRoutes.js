const {
  register,
  login,
  logout,
  refresh,
} = require("../controllers/authController");

const router = require("express").Router();
const passport = require("passport");

router
  .post("/register", register)
  .post("/login", login)
  .get("/logout", passport.authenticate("jwt", { session: false }), logout)
  .post("/refresh", refresh);

module.exports = router;
