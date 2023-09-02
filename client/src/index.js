import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NoteProvider from "./context/NoteProvider";
import { BrowserRouter } from "react-router-dom";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NoteProvider>
      <App />
    </NoteProvider>
  </BrowserRouter>
);
