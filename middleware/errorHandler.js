module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  return res.json({
    status: err.statusCode,
    message: err.message,
  });
};
