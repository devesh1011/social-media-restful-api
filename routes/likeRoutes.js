const router = require("express").Router();
const { likePost, unlikePost } = require("../controllers/likeController");
const passport = require("passport");

router
  .post("/", passport.authenticate("jwt", { session: false }), likePost)
  .delete("/", passport.authenticate("jwt", { session: false }), unlikePost);

module.exports = router;
