const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find().populate("courses");
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    console.log(req.user);
    const bootcamp = await Bootcamp.insertMany(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.findById(req.params.id).populate(
      "courses"
    );

    if (!bootcamps)
      return next(
        new ErrorResponse(`This id is not valid ${req.params.id}`, 404)
      );

    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

exports.updateBootcamps = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

exports.deleteBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    bootcamp.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
