import { React, useContext, useState }from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthContext, { AuthProvider } from "../components/authContext";
import logo from "../images/logo.svg";
import SearchFunction from './SearchFunction';

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false)
  
  function logout() {
    setAuth(null);
  }

  return (
    <AuthProvider>
      <Navbar expanded={expanded} expand="lg" bg="dark" variant='dark'>
          <Container>
              <Link to="/"><Navbar.Brand ><img src={logo} alt="logo" /></Navbar.Brand></Link>
              <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className=''>
                      <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/"}>Home</Nav.Link>
                      <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/hotels"}>Hotels</Nav.Link>
                      <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/booking"}>Book hotel</Nav.Link>
                      <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/contact"}>Contact</Nav.Link>
                  </Nav>
                    <SearchFunction />
                  <Nav>
                        {auth ? (
                          <>
                            <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/admin"}>Admin</Nav.Link>
                            <Nav.Link onClick={() => {
                              logout()
                              setExpanded(false);
                            }}>Log out</Nav.Link>
                            <Navbar.Text>
                              Signed in as: <span>{auth.user.username}</span>
                            </Navbar.Text>
                          </>
                        ) : ( 
                              <>
                                <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/login"}>Login</Nav.Link>
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