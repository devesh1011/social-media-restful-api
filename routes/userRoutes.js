const {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

const {
  followUser,
  unFollowUser,
  getAllFollowers,
  getAllFollowing,
} = require("../controllers/followerController");

const router = require("express").Router();
const likeRoute = require("../routes/likeRoutes");
const passport = require("../config/passport");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../middleware/CustomError");

router
  .get("/:id", userProfile)
  .put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateUserProfile
  )
  .delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    deleteUserProfile
  );

// follow routes
router
  .get(
    "/:userId/followers",
    passport.authenticate("jwt", { session: false }),
    getAllFollowers
  )
  .get(
    "/:userId/following",
    passport.authenticate("jwt", { session: false }),
    getAllFollowing
  )
  .post(
    "/:userId/follow",
    passport.authenticate("jwt", { session: false }),
    followUser
  )
  .delete(
    "/:userId/follow",
    passport.authenticate("jwt", { session: false }),
    unFollowUser
  );
module.exports = router;
