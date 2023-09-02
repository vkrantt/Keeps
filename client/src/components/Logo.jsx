import React from "react";
import logo from "../assets/sticky-note.png";
const Logo = ({ text }) => {
  return (
    <div className="d-flex align-items-end">
      <img src={logo} alt="keeps" style={{ width: "35px" }} />
      <h4 className="mx-2">{text ? text : "Keeps"}</h4>
    </div>
  );
};

export default Logo;
