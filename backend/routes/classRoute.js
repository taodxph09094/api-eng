const express = require("express");
const {
  newClass,
  getSingleOrder,
  myClass,
  getAllClass,
  updateClass,
  deleteOrder,
} = require("../controllers/classController");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/class/new").post(isAuthenticatedUser, newClass);

router.route("/class/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/class/me").get(isAuthenticatedUser, myClass);

router
  .route("/admin/class")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllClass);

router
  .route("/admin/class/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateClass)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
