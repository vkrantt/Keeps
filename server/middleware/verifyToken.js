const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const handleError = require("../handlers/errors");

const authToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    handleError(res, `Unauthorized`, 500);
    return;
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      handleError(res, `Unauthorized`, 500);
      return;
    }
    // decode
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    handleError(res, `Unauthorized`, 500);
  }
};

module.exports = authToken;
