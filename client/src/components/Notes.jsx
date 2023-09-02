import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import NoteCard from "./NoteCard";
import { NoteState } from "../context/NoteProvider";
import { useEffect } from "react";
import { BASE_URL, handleError } from "../config/config";
import axios from "axios";

const Notes = () => {
  const { notes, setNotes } = NoteState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllNotes = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("keeps-token"));
    const options = {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    };

    try {
      const { data } = await axios.get(`${BASE_URL}/api/note/all`, options);
      setIsLoading(false);
      setNotes(data);
    } catch (error) {
      setIsLoading(false);
      const message = handleError(error);
      if (message) {
        console.log("error", message);
        return;
      }
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        {isLoading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}

        {notes.length === 0 && !isLoading && (
          <div className="text-center text-primary fw-bold">
            No notes to show...
          </div>
        )}

        {notes &&
          notes.map((note) => (
            <Col lg="3" key={note._id}>
              <NoteCard note={note} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Notes;
