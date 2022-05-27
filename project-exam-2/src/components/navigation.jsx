import { React, useContext }from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthContext, { AuthProvider } from "../components/authContext";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  
  function logout() {
    setAuth(null);
  }

  return (
    <AuthProvider>
      <Navbar collapseOnSelect expand="lg">
          <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse  id="responsive-navbar-nav">
                  <Nav className='me-auto'>
                      <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                      <Nav.Link as={Link} to={"/hotels"}>Hotels</Nav.Link>
                      <Nav.Link as={Link} to={"/booking"}>Book hotel</Nav.Link>
                      <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link>
                  </Nav>

                  <Nav>
                        {auth ? (
                          <>
                            <Nav.Link as={Link} to={"/admin"}>Admin</Nav.Link>
                            <Nav.Link onClick={logout}>Log out</Nav.Link>
                            <Navbar.Text>
                              Signed in as: <span>{auth.user.username}</span>
                            </Navbar.Text>
                          </>
                        ) : ( 
                              <>
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                              </>
                            )}

                        
                      </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    </AuthProvider>
  )
}

export default Navigation