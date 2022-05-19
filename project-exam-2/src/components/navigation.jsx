import { React, useEffect, useState }from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {  getUser } from "../components/localStorage";
import { AuthProvider } from "../components/authContext";

function Navigation() {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    setAuth(getUser);
  },[auth])
  
  console.log(auth)
  
  function logout() {
    setAuth(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthProvider>
      <Navbar expand="lg">
          <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                      <Nav.Link as={Link} to={"/hotels"}>Hotels</Nav.Link>
                      <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link>
                      

                      {auth ? (
                        <>
                          <Nav.Link as={Link} to={"/"} onClick={logout}>Log out</Nav.Link>
                          <Nav.Link as={Link} to={"/admin"}>Admin</Nav.Link>
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