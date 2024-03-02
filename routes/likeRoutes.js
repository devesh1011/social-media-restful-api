const router = require("express").Router();
const { likePost, unlikePost } = require("../controllers/likeController");

router.post("/", likePost).delete("/", unlikePost);

module.exports = router;
