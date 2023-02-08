const express = require("express");
const {
  getBootcamps,
  createBootcamp,
  getBootcamp,
  deleteBootcamps,
  updateBootcamps,
} = require("../controllers/bootcamps");
const courseRouter = require("./courses");
const { protect, authorize } = require("../middleware/auth");
const checkAuthenticated = require("../middleware/passport_isAuth");

const router = express.Router();

router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootcamps).post(checkAuthenticated, createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .patch(checkAuthenticated, authorize("admin", "publisher"), updateBootcamps)
  .delete(checkAuthenticated, authorize("admin", "publisher"), deleteBootcamps);

module.exports = router;
