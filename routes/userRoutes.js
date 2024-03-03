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
const passport = require("../config/passport");

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

router
  .get("/:id/followers", getAllFollowers)
  .get("/:id/following", getAllFollowing);

router.use(
  "/:id/follow",
  passport.authenticate("jwt", { session: false }),
  followRoute
);

module.exports = router;
