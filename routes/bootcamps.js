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

const router = express.Router();

router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(getBootcamps)
  .post(protect, authorize("admin", "publisher"), createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .patch(protect, authorize("admin", "publisher"), updateBootcamps)
  .delete(protect, authorize("admin", "publisher"), deleteBootcamps);

module.exports = router;
