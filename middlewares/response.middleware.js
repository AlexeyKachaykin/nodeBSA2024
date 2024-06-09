const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const statusCode = res.err.statusCode || 500;
    const message = res.err.message || "Internal server error";
    res.status(statusCode).json({ error: true, message });
  } else if (res.data) {
    res.status(200).json(res.data);
  } else {
    res.status(404).json({ error: true, message: "Data not found" });
  }
  next();
};

export { responseMiddleware };
