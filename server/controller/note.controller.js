const handleError = require("../handlers/errors");
const Note = require("../models/note.model");

// getall notes
const getAllNotes = async (req, res) => {
  try {
    const query = { userId: req.user._id };
    const notes = await Note.find(query).sort({ _id: -1 });

    res.send(notes);
  } catch (error) {
    handleError(res, `An error occurred on server - ${error} `, 500);
  }
};

// create Note
const createNote = async (req, res) => {
  const { name, description } = req.body;
  try {
    const note = await Note.create({
      userId: req.user,
      name,
      description,
    });

    res.status(200).json(note);
  } catch (error) {
    handleError(res, `An error occurred on server - ${error} `, 500);
  }
};

// delete note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndDelete(id);
    res.status(200).json({
      message: "Note deleted.",
    });
  } catch (error) {
    handleError(res, `An error occurred on server - ${error} `, 500);
  }
};

// delete note
const editNote = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { $set: { name, description } },
      { new: true }
    );
    res.status(200).json(note);
  } catch (error) {
    handleError(res, `An error occurred on server - ${error} `, 500);
  }
};

// search user
const searchNotes = async (req, res) => {
  try {
    const query = req.query.search
      ? {
          $or: [
            {
              name: { $regex: req.query.search, $options: "i" },
            },
            {
              description: { $regex: req.query.search, $options: "i" },
            },
          ],

          $and: [
            {
              userId: req.user._id,
            },
          ],
        }
      : { userId: req.user._id };
    const notes = await Note.find(query);
    res.send(notes);
  } catch (error) {
    handleError(res, `An error occurred on server - ${error} `, 500);
  }
};

module.exports = { getAllNotes, createNote, searchNotes, deleteNote, editNote };
