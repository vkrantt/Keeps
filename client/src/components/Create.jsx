import React from "react";
import { useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { TbPinned } from "react-icons/tb";
import { NoteState } from "../context/NoteProvider";
import axios from "axios";
import { BASE_URL, handleError } from "../config/config";

const Create = ({ showFullForm, isShowForm, editNote, setModalShow }) => {
  const [showForm, setShowForm] = useState(false);
  const { user, notes, setNotes } = NoteState();
  const [note, setNote] = useState({
    name: editNote?.name ? editNote.name : "",
    description: editNote?.description ? editNote.description : "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");
    if (!note.description) {
      setShowForm(false);
      return;
    }

    setIsLoading(true);
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };

    let url;
    if (editNote) {
      url = `${BASE_URL}/api/note/edit/${editNote._id}`;
    } else {
      url = `${BASE_URL}/api/note`;
    }

    try {
      const { data } = await axios.post(url, note, options);
      setIsLoading(false);
      if (editNote) {
        setModalShow(false);
        const index = notes.findIndex((n) => n._id === editNote._id);
        if (index !== -1) {
          const newNotes = [...notes];
          newNotes[index] = data;
          setNotes(newNotes);
        }
      } else {
        setShowForm(false);
        setNotes([...notes, data]);
        setNote({
          name: "",
          description: "",
        });
      }
    } catch (error) {
      setIsLoading(false);
      const message = handleError(error);
      if (message) {
        setIsError(true);
        setMessage(message);
        return;
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col
          lg={editNote ? "12" : "8"}
          md="12"
          sm="12"
          className={`${editNote ? "p-0 m-0" : "m-auto mt-4"}`}
        >
          {isError && <Alert variant="danger">{message}</Alert>}
          <Form className="p-2 border border-2 rounded-3 shadow bg-light">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                className="shadow-none border-0 fw-bold bg-light"
                name="name"
                onChange={handleChange}
                value={note.name}
                onClick={() => setShowForm(true)}
              />
            </Form.Group>

            {(showForm || isShowForm) && (
              <>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="shadow-none border-0 fw-bold bg-light"
                    name="description"
                    onChange={handleChange}
                    value={note.description}
                    placeholder="Take a note..."
                    autoFocus
                  />
                </Form.Group>

                <div className="d-flex me-auto justify-content-between ">
                  <Button variant="none" type="button">
                    <TbPinned className="fs-5" />
                  </Button>
                  <Button
                    variant="none"
                    type="submit"
                    onClick={handleSubmit}
                    className="fw-bold"
                  >
                    {isLoading ? <Spinner size="sm" /> : "Close"}
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
