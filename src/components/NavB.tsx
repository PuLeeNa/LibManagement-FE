import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router";

function NavB() {
  return (
    <>
      <Navbar style={{ backgroundColor: "navy" }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/book"
            style={{
              fontSize: "1.8rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2702/2702134.png"
              alt="Library Logo"
              style={{ width: "40px", height: "40px" }}
            />
            LibraFlow
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/book">
              Book
            </Nav.Link>
            <Nav.Link as={NavLink} to="/lending">
              Lendings
            </Nav.Link>
            <Nav.Link as={NavLink} to="/staff">
              Staff
            </Nav.Link>
            <Nav.Link as={NavLink} to="/member">
              Members
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavB;
