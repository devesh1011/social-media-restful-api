const router = require("express").Router();
const {
  getPostComments,
  newPostComment,
  deletePostComment,
  updatePostComment,
} = require("../controllers/commentController");
const passport = require("passport");

router
  .get("/", getPostComments)
  .post("/", passport.authenticate("jwt", { session: false }), newPostComment)
  .put(
    "/:commentId",
    passport.authenticate("jwt", { session: false }),
    updatePostComment
  )
  .delete(
    "/:commentId",
    passport.authenticate("jwt", { session: false }),
    deletePostComment
  );

module.exports = router;
