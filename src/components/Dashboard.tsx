import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4" style={{ color: "navy" }}>
        Library Management Dashboard
      </h1>
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="text-center h-100" style={{ borderColor: "navy" }}>
            <Card.Body>
              <Card.Title style={{ color: "navy" }}>📚 Books</Card.Title>
              <Card.Text>Manage library books</Card.Text>
              <Link to="/book" className="btn btn-outline-primary">
                Go to Books
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-center h-100" style={{ borderColor: "navy" }}>
            <Card.Body>
              <Card.Title style={{ color: "navy" }}>👥 Members</Card.Title>
              <Card.Text>Manage library members</Card.Text>
              <Link to="/member" className="btn btn-outline-primary">
                Go to Members
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-center h-100" style={{ borderColor: "navy" }}>
            <Card.Body>
              <Card.Title style={{ color: "navy" }}>👨‍💼 Staff</Card.Title>
              <Card.Text>Manage library staff</Card.Text>
              <Link to="/staff" className="btn btn-outline-primary">
                Go to Staff
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-center h-100" style={{ borderColor: "navy" }}>
            <Card.Body>
              <Card.Title style={{ color: "navy" }}>📖 Lendings</Card.Title>
              <Card.Text>Manage book lendings</Card.Text>
              <Link to="/lending" className="btn btn-outline-primary">
                Go to Lendings
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
