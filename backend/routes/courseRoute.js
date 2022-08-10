const express = require("express");
const {
  getAllCourses,
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetails,
  createCourseReview,
  getCourseReviews,
  deleteReview,
} = require("../controllers/courseController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/courses").get(getAllCourses);

router
  .route("/admin/courses")
  .get(isAuthenticatedUser, authorizeRoles("admin", "user"), getAdminCourses);

router
  .route("/admin/course/new")
  .post(isAuthenticatedUser, authorizeRoles("admin", "user"), createCourse);

router
  .route("/admin/course/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "user"), updateCourse)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "user"), deleteCourse);

router.route("/course/:id").get(getCourseDetails);

router.route("/review").put(isAuthenticatedUser, createCourseReview);

router.route("/reviews/").get(getCourseReviews);
router.route("/reviews/").delete(isAuthenticatedUser, deleteReview);
module.exports = router;
