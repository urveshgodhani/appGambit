const Bootcamp = require("../models/Bootcamps");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find().populate("courses");
  res.status(200).json({ success: true, data: bootcamps });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  console.log(req);
  const bootcamp = await Bootcamp.insertMany(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.findById(req.params.id).populate("courses");

  if (!bootcamps)
    return next(
      new ErrorResponse(`This id is not valid ${req.params.id}`, 404)
    );

  res.status(200).json({ success: true, data: bootcamps });
});

exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // const bootcamp = await Bootcamp.findById(req.params.id);

  // bootcamp.name = "urvesh";
  // console.log(bootcamp);

  // await bootcamp.save();

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: bootcamp });
});

exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});
