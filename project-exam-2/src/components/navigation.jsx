import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { getUser } from "../components/localStorage";

function Navigation() {

  return (
    <Navbar expand="lg">
        <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/hotels"}>Hotels</Nav.Link>
                    <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link>
                    <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>

                    
                    <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation