import React from "react";
import { Button, Card } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { BiTrashAlt } from "react-icons/bi";
import { TbPinnedFilled } from "react-icons/tb";
import "./NoteCard.css";
import { BASE_URL, handleError } from "../config/config";
import axios from "axios";
import { NoteState } from "../context/NoteProvider";
import EditModal from "./EditModal";

const NoteCard = ({ note }) => {
  const { notes, setNotes, setNoteForEdit } = NoteState();

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

  return (
    <Card className="mb-3 border bg-light border-2 shadow cardd">
      <Card.Body>
        <Card.Title>{note.name ? note.name : note.description}</Card.Title>
        <Card.Text>{note.name ? note.description : ""}</Card.Text>
        <div className="controller">
          <EditModal>
            <Button
              variant="none"
              size="sm"
              className="me-2"
              onClick={() => setNoteForEdit(note)}
            >
              <FiEdit />
            </Button>
          </EditModal>
          <Button
            variant="none"
            size="sm"
            className="me-2"
            onClick={() => handleDelete(note._id)}
          >
            <BiTrashAlt />
          </Button>
          <Button variant="none" size="sm" className="me-2">
            <TbPinnedFilled className="fs-5" />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
