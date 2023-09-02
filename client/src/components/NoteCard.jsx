import React from "react";
import { Button, Card } from "react-bootstrap";
import "./NoteCard.css";
import { BASE_URL, handleError } from "../config/config";
import axios from "axios";
import { NoteState } from "../context/NoteProvider";
import EditModal from "./EditModal";
import { TbPinned } from "react-icons/tb";
import { useState } from "react";

const NoteCard = ({ note }) => {
  const { notes, setNotes, setNoteForEdit } = NoteState();
  const [isPinned, setIsPinned] = useState(true);

  // delete
  const handleDelete = async (id) => {
    setNotes(notes.filter((n) => n._id !== id));
    const user = JSON.parse(localStorage.getItem("keeps-token"));
    const options = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    try {
      await axios.delete(`${BASE_URL}/api/note/delete/${note._id}`, options);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (error) {
      const message = handleError(error);
      if (message) {
        console.log("error", message);
        return;
      }
    }
  };

  const handlePinned = (id) => {
    setIsPinned(!isPinned);
    const index = notes.findIndex((n) => n._id === id);
    if (index !== -1) {
      const newNotes = [...notes];
      console.log(newNotes);
      const newItem = {
        ...note,
        pinned: isPinned,
      };
      newNotes[index] = newItem;
      setNotes(newNotes);
    }
  };

  return (
    <Card className="mb-3 bg-light shadow-xs cardd">
      <Card.Body>
        <Card.Text className="fw-bold fs-5 d-flex justify-content-between">
          {note.name ? note.name : note.description}

          {note.pinned && (
            <span className="material-symbols-outlined text-primary">
              push_pin
            </span>
          )}
        </Card.Text>
        <Card.Text className="text-muted fw-bold">
          {note.name ? note.description : ""}
        </Card.Text>
        <div className="controller">
          <EditModal>
            <Button
              variant="none"
              size="sm"
              className="me-2 p-1 px-2"
              onClick={() => setNoteForEdit(note)}
            >
              <span className="material-symbols-outlined">edit</span>
            </Button>
          </EditModal>
          <Button
            variant="none"
            size="sm"
            className="me-2 p-1 px-2"
            onClick={() => handleDelete(note._id)}
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>
          <Button
            variant="none"
            size="sm"
            className="me-2 p-1 px-2"
            onClick={() => handlePinned(note._id)}
          >
            <TbPinned className="fs-4 mb-1" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
