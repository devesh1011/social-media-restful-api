const router = require("express").Router();
const {
  getAllFollowers,
  unFollowUser,
  followUser,
  getAllFollowing,
} = require("../controllers/followerController");
const passport = require("passport");

router
  .post("/", passport.authenticate("jwt", { session: false }), followUser)
  .delete("/", passport.authenticate("jwt", { session: false }), unFollowUser);

module.exports = router;
