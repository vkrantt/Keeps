import React from "react";
import { Container, Form, Nav, Navbar, Button, Spinner } from "react-bootstrap";
import { NoteState } from "../context/NoteProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, titleCase } from "../config/config";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import Logo from "./Logo";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  const { pathname } = useLocation();
  const { user, setUser, setNotes } = NoteState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setNotes([]);
    setExpanded(false);
    localStorage.removeItem("keeps-token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { token } = JSON.parse(localStorage.getItem("keeps-token"));
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/note?search=${search}`,
        options
      );
      setIsLoading(false);
      setNotes(data);
      setExpanded(false);
    } catch (error) {
      setIsLoading(false);
      setExpanded(false);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const navToggle = () => {
    setExpanded(expanded ? false : true);
  };

  const closeNav = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      className="bg-body-tertiary position-sticky top-0 shadow"
      style={{ zIndex: 10 }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold  d-none d-sm-block">
          <Logo />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-block d-sm-none">
          <Logo text={titleCase(user?.name)} />
        </Navbar.Brand>
        <Navbar.Toggle
          className="shadow-none border-0 p-0 fs-6"
          onClick={navToggle}
        />
        {user ? (
          <>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-3 my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Navbar.Text className=" d-none d-sm-block">
                  Signed in as: <b>{titleCase(user?.name)}</b>
                </Navbar.Text>
              </Nav>
              <Form>
                <div className="d-flex align-items-center bg-white border border-2 overflow-hidden rounded-pill">
                  <IoSearchOutline className="bg-white fs-3 mx-3" />
                  <Form.Control
                    type="search"
                    placeholder="Find your notes"
                    className=" border-0 bg-white shadow-none m-0 p-0"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button
                    variant="success"
                    className="rounded-0"
                    onClick={handleSubmit}
                  >
                    {isLoading ? <Spinner size="sm" /> : "Find"}
                  </Button>
                </div>
              </Form>
            </Navbar.Collapse>

            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="m-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link onClick={() => handleLogout()}>
                  <FiLogOut /> Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Navbar.Collapse>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                as={Link}
                to="/login"
                onClick={closeNav}
                className={`${
                  pathname === "/login"
                    ? "active  border-bottom border-3 border-primary"
                    : ""
                }`}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                onClick={closeNav}
                className={`${
                  pathname === "/signup"
                    ? "active  border-bottom border-3 border-primary"
                    : ""
                }`}
              >
                Signup
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
