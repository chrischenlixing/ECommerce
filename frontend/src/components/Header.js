import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox';

function BasicExample() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg = "dark" variant = "dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>Sports Zone</Navbar.Brand>
        </LinkContainer>
        <SearchBox/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">

          <LinkContainer to='/cart'>
            <Nav.Link><i className='fas fa-shopping-cart'>CART</i></Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title = {userInfo.name} id='username'>
                <LinkContainer to = '/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>

              
            ) : (             
            <LinkContainer to='/login'>
            <Nav.Link><i className='fas fa-user'>LOGIN</i></Nav.Link>
            </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenue'>
                        <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>

                    </NavDropdown>
                )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;