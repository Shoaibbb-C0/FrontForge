const notFound = (req, res, next) => {
  const error = new Error(`Endpoint not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "ValidationError" || err.name === "CastError") {
    statusCode = 400;
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "A resource with this slug already exists";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export { notFound, errorHandler };
