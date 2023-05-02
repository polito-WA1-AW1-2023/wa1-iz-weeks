import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavHeader() {
  return (
  <Navbar bg="primary" variant="dark">
    <Container fluid>
      <Link to='/' className='navbar-brand'>HeapOverrun</Link>
    </Container>
  </Navbar>
  );
}

export default NavHeader;