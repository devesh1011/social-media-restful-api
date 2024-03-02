const router = require("express").Router();
const commentRoute = require("../routes/commentRoutes");
const likeRoute = require("../routes/likeRoutes");
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
  .post("/", createPost)
  .put("/:id", updatePost)
  .delete("/:id", deletePost);

router.use("/:postId/comments", commentRoute);
router.use("/:postId/like", likeRoute);

module.exports = router;
