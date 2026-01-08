import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Avalehele</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/ostukorv">Ostukorv</Nav.Link>
            <Nav.Link as={Link} to="/admin/lisa-toode">Lisa toode</Nav.Link>
            <Nav.Link as={Link} to="/admin/halda-tooteid">Halda tooteid</Nav.Link>
            <Nav.Link as={Link} to="/admin/halda-kategooriaid">Halda kategooriaid</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/minu-tellimused">Minu tellimused</Nav.Link>
            <Nav.Link as={Link} to="/profiil">Profiil</Nav.Link>
            <Nav.Link as={Link} to="/logi-sisse">Logi sisse</Nav.Link>                      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;