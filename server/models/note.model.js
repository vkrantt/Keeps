const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("note", noteSchema);
module.exports = Note;
