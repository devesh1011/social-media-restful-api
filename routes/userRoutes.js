const {
  userProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

const router = require("express").Router();

router
  .get("/:id", userProfile)
  .put("/:id", updateUserProfile)
  .delete("/:id", deleteUserProfile);

module.exports = router;
