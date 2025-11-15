import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetBooks } from "../service/BookData";
import { GetMembers } from "../service/MemberData";
import { GetStaffs } from "../service/StaffData";
import { GetLendings } from "../service/LendingData";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    totalStaff: 0,
    activeLendings: 0,
    availableBooks: 0,
  });
  const [recentLendings, setRecentLendings] = useState<any[]>([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [books, members, staff, lendings] = await Promise.all([
          GetBooks(),
          GetMembers(),
          GetStaffs(),
          GetLendings(),
        ]);

        const availableBooks = books.reduce(
          (sum: number, book: any) => sum + (book.availableQty || 0),
          0
        );
        const activeLendings = lendings.filter(
          (l: any) => l.isActiveLending === "true"
        ).length;

        setStats({
          totalBooks: books.length,
          totalMembers: members.length,
          totalStaff: staff.length,
          activeLendings: activeLendings,
          availableBooks: availableBooks,
        });

        setRecentLendings(lendings.slice(0, 5));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4" style={{ color: "navy" }}>
        Library Management Dashboard
      </h1>

      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card
            className="text-center h-100 shadow-sm"
            style={{ borderColor: "navy" }}
          >
            <Card.Body>
              <div style={{ fontSize: "2rem" }}>📚</div>
              <h2 style={{ color: "navy", fontWeight: "bold" }}>
                {stats.totalBooks}
              </h2>
              <Card.Title style={{ color: "navy" }}>Total Books</Card.Title>
              <Card.Text className="text-muted small">
                {stats.availableBooks} available
              </Card.Text>
              <Link to="/book" className="btn btn-outline-primary btn-sm">
                Manage Books
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card
            className="text-center h-100 shadow-sm"
            style={{ borderColor: "navy" }}
          >
            <Card.Body>
              <div style={{ fontSize: "2rem" }}>👥</div>
              <h2 style={{ color: "navy", fontWeight: "bold" }}>
                {stats.totalMembers}
              </h2>
              <Card.Title style={{ color: "navy" }}>Members</Card.Title>
              <Card.Text className="text-muted small">
                Registered members
              </Card.Text>
              <Link to="/member" className="btn btn-outline-primary btn-sm">
                Manage Members
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card
            className="text-center h-100 shadow-sm"
            style={{ borderColor: "navy" }}
          >
            <Card.Body>
              <div style={{ fontSize: "2rem" }}>👨‍💼</div>
              <h2 style={{ color: "navy", fontWeight: "bold" }}>
                {stats.totalStaff}
              </h2>
              <Card.Title style={{ color: "navy" }}>Staff</Card.Title>
              <Card.Text className="text-muted small">Library staff</Card.Text>
              <Link to="/staff" className="btn btn-outline-primary btn-sm">
                Manage Staff
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card
            className="text-center h-100 shadow-sm"
            style={{ borderColor: "navy" }}
          >
            <Card.Body>
              <div style={{ fontSize: "2rem" }}>📖</div>
              <h2 style={{ color: "navy", fontWeight: "bold" }}>
                {stats.activeLendings}
              </h2>
              <Card.Title style={{ color: "navy" }}>Active Lendings</Card.Title>
              <Card.Text className="text-muted small">
                Currently borrowed
              </Card.Text>
              <Link to="/lending" className="btn btn-outline-primary btn-sm">
                Manage Lendings
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Lendings Table */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header style={{ backgroundColor: "navy", color: "white" }}>
              <h5 className="mb-0">Recent Lendings</h5>
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Member</th>
                    <th>Lending Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                    <th>Fine</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLendings.length > 0 ? (
                    recentLendings.map((lending: any, index: number) => (
                      <tr key={index}>
                        <td>{lending.book}</td>
                        <td>{lending.member}</td>
                        <td>{lending.lendingDate}</td>
                        <td>{lending.returnDate}</td>
                        <td>
                          {lending.isActiveLending === "true" ? (
                            <Badge bg="success">Active</Badge>
                          ) : (
                            <Badge bg="secondary">Returned</Badge>
                          )}
                        </td>
                        <td>
                          {lending.fineAmount > 0 ? (
                            <span className="text-danger">
                              ${lending.fineAmount.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-muted">$0.00</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center text-muted">
                        No recent lendings
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
