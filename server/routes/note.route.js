const {
  createNote,
  searchNotes,
  deleteNote,
  editNote,
  getAllNotes,
} = require("../controller/note.controller");
const authToken = require("../middleware/verifyToken");
const router = require("express").Router();

router.route("/all").get(authToken, getAllNotes);
router.route("/").post(authToken, createNote).get(authToken, searchNotes);
router.route("/delete/:id").delete(authToken, deleteNote);
router.route("/edit/:id").post(editNote);

module.exports = router;
