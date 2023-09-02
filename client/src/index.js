import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import NoteProvider from "./context/NoteProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NoteProvider>
      <App />
    </NoteProvider>
  </BrowserRouter>
);
