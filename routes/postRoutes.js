const router = require("express").Router();
const commentRoute = require("../routes/commentRoutes");
const likeRoute = require("../routes/likeRoutes");
const passport = require("passport");
const {
  getAllPosts,
  getPostById,
  updatePost,
  createPost,
  deletePost,
} = require("../controllers/postController");

router
  .get("/", getAllPosts)
  .get("/:id", getPostById)
  .post("/", passport.authenticate("jwt", { session: false }), createPost)
  .put("/:id", passport.authenticate("jwt", { session: false }), updatePost)
  .delete("/:id", passport.authenticate("jwt", { session: false }), deletePost);

router.use("/:postId/comments", commentRoute); // comment route
router.use(
  "/:postId/like",
  passport.authenticate("jwt", { session: false }),
  likeRoute
); //like route

module.exports = router;
