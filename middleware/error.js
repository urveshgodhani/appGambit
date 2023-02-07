function error(err, req, res, next) {
  console.log("ssss");
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message,
  });
}

module.exports = error;
