const {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

const {
  getAllFollowers,
  getAllFollowing,
} = require("../controllers/followerController");

const router = require("express").Router();
const likeRoute = require("../routes/likeRoutes");
const followRoute = require("../routes/followerRoutes");

router
  .get("/:id", userProfile)
  .get("/:id/followers", getAllFollowers)
  .get("/:id/following", getAllFollowing)
  .put("/:id", updateUserProfile)
  .delete("/:id", deleteUserProfile);

router.use("/:userId/follow", followRoute);

module.exports = router
