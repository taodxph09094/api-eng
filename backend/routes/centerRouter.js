const express = require("express");
const {
  createCenter,
  getCenter,
  updateCenter,
  deleteCenter,
} = require("../controllers/centerController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/center/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCenter);
router
  .route("/admin/center")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCenter);
router
  .route("/admin/center/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCenter)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCenter);

module.exports = router;
