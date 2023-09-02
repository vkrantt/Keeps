import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [notes, setNotes] = useState([]);
  const [noteForEdit, setNoteForEdit] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("keeps-token"));
    setUser(user);
  }, []);

  return (
    <NoteContext.Provider
      value={{ user, setUser, notes, setNotes, noteForEdit, setNoteForEdit }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const NoteState = () => {
  return useContext(NoteContext);
};

export default NoteProvider;
