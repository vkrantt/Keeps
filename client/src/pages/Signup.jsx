import React from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { BASE_URL, handleError } from "../config/config";
import { Link, useNavigate } from "react-router-dom";
import { NoteState } from "../context/NoteProvider";
import Logo from "../components/Logo";

const Signup = () => {
  const { setUser } = NoteState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");
    if (!credentials.name || !credentials.username || !credentials.password) {
      setIsError(true);
      setErrorMessage("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/api/user`, credentials);
      setIsLoading(false);
      navigate("/");
      setUser(data);
      localStorage.setItem("keeps-token", JSON.stringify(data));
    } catch (error) {
      setIsLoading(false);
      const message = handleError(error);
      if (message) {
        setIsError(true);
        setErrorMessage(message);
        return;
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="5" className="m-auto mt-5">
          <div className="mb-3">
            <Logo />
          </div>

          {isError && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="name"
                onChange={handleChange}
                className="p-3 shadow-none border-2 fs-5"
                value={credentials.name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                className="p-3 shadow-none border-2 fs-5"
                value={credentials.username}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="p-3 shadow-none border-2 fs-5"
                value={credentials.password}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-100 p-3 fs-5"
            >
              {isLoading ? <Spinner size="sm" /> : "Sign Up"}
            </Button>
          </Form>
          <div className="d-flex mt-3 ">
            <Link to="/login">Already have an account?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
