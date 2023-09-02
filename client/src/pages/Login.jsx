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
import { NoteState } from "../context/NoteProvider";
import { useNavigate } from "react-router-dom";
import { BASE_URL, handleError } from "../config/config";
import axios from "axios";

const Login = () => {
  const { setUser } = NoteState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
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
    if (!credentials.username || !credentials.password) {
      setIsError(true);
      setErrorMessage("Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/user/login`,
        credentials
      );
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
          {isError && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
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
                value={credentials.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              {isLoading ? <Spinner size="sm" /> : "Log In"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
