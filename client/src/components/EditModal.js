import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Create from "./Create";
import { NoteState } from "../context/NoteProvider";

const EditModal = ({ children }) => {
  const { noteForEdit } = NoteState();
  const [show, setShow] = useState(false);
  const [showFullForm] = useState(true);
  const [isShowForm] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {children && <span onClick={handleShow}>{children}</span>}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="p-0 m-0"
        centered
      >
        <Create
          showFullForm={showFullForm}
          isShowForm={isShowForm}
          editNote={noteForEdit}
          setModalShow={setShow}
        />
      </Modal>
    </>
  );
};

export default EditModal;
