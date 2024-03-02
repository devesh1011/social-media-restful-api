const router = require("express").Router();
const {
  getAllFollowers,
  unFollowUser,
  followUser,
  getAllFollowing,
} = require("../controllers/followerController");

router
  .post("/", followUser)
  .delete("/", unFollowUser)

  module.exports = router;
