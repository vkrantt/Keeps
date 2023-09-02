const getToken = require("../config/generateToken");
const handleError = require("../handlers/errors");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// create user
const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ username });
    if (user) {
      handleError(res, "User already exists.", 400);
      return;
    }

    // has password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({
      name,
      username,
      password: hash,
    });

    if (!newUser) {
      handleError(
        res,
        "An error occurred on server while registering the new user.",
        400
      );
      return;
    }

    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      token: getToken(newUser._id),
    });
  } catch (err) {
    handleError(res, `An error occurred on server - ${err} `, 500);
  }
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      handleError(res, "User not exists.", 400);
      return;
    }

    // match the password
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      handleError(res, "User not exists.", 400);
      return;
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: getToken(user._id),
    });
  } catch (err) {
    handleError(res, `An error occurred on server - ${err} `, 500);
  }
};

module.exports = { createUser, loginUser };
