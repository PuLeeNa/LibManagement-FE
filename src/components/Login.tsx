import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import authService, {
  LoginCredentials,
} from "../service/authService/AuthService";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login(credentials);
      toast.success("Login successful! Welcome back.");
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage =
        err.response?.data || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card
              className="shadow-lg"
              style={{
                borderRadius: "20px",
                border: "none",
              }}
            >
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                    }}
                  >
                    📚
                  </div>
                  <h2
                    style={{
                      color: "navy",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    LibraFlow
                  </h2>
                  <p className="text-muted">Library Management System</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: "500" }}>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        border: "2px solid #e0e0e0",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: "500" }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        border: "2px solid #e0e0e0",
                      }}
                    />
                  </Form.Group>

                  {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "10px",
                      backgroundColor: "navy",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
