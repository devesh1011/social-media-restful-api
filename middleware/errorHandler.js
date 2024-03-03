const CustomError = require("./CustomError");

const handleError = (error, res, message) => {
  if (error.name === "ValidationError") {
    // Mongoose validation error
    const validationErrors = Object.values(error.errors).map(
      (err) => err.message
    );
    const customError = new CustomError(validationErrors.join(", "), 400);
    return sendErrorResponse(customError, res);
  }

  // Other types of errors
  const customError = new CustomError(message, 500);
  return sendErrorResponse(customError, res);
};

const sendErrorResponse = (customError, res) => {
  return res
    .status(customError.statusCode)
    .json({ error: customError.message });
};

module.exports = handleError;
