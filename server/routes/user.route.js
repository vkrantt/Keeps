const router = require("express").Router();
const { createUser, loginUser } = require("../controller/user.controller");

router.route("/").post(createUser);
router.route("/login").post(loginUser);

module.exports = router;
