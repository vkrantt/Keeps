const handleError = (res, msg, status) => {
  res.status(status).json({ error: msg });
  return;
};

module.exports = handleError;
