const notFound = (req, res, next) => {
  const error = new Error(`Endpoint not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export { notFound, errorHandler };