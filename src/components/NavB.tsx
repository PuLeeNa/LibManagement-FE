import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavB() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* <Navbar.Brand href="#home">LibManagement</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link href="#home">Book</Nav.Link>
            <Nav.Link href="#features">Lendings</Nav.Link>
            <Nav.Link href="#pricing">Staff</Nav.Link>
            <Nav.Link href="#pricing">Members</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavB;