const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");

exports.getCourses = async (req, res, next) => {
  try {
    let query;

    if (req.params.bootcampId) {
      query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
      query = Course.find({}).populate({
        path: "bootcamp",
        select: "name description",
      });
    }

    const courses = await query;
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};
