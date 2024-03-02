const router = require("express").Router();
const {
  getPostComments,
  newPostComment,
  deletePostComment,
  updatePostComment,
} = require("../controllers/commentController");

router
  .get("/", getPostComments)
  .post("/", newPostComment)
  .put("/:commentId", updatePostComment)
  .delete("/:commentId", deletePostComment);

module.exports = router;
