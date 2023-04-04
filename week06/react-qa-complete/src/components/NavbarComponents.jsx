import { Navbar, Container } from 'react-bootstrap';

function NavHeader(props) {
  return (
  <Navbar bg="primary" variant="dark">
    <Container fluid>
      <Navbar.Brand>HeapOverrun - Question {props.questionNum}</Navbar.Brand>
    </Container>
  </Navbar>
  );
}

export default NavHeader;