export const requestLogger = (req, res, next) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} → ${res.statusCode}`);
  });
  next();
}