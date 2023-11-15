import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'

function BasicExample() {
  return (
    <Navbar bg = "dark" variant = "dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

          <LinkContainer to='/cart'>
            <Nav.Link><i className='fas fa-shopping-cart'>CART</i></Nav.Link>
            </LinkContainer>

            <LinkContainer to='/login'>
            <Nav.Link><i className='fas fa-user'>LOGIN</i></Nav.Link>
            </LinkContainer>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;