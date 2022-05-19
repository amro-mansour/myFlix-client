import React from "react";
import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap';

export class NavbarView extends React.Component {

  render() {

    return (

      <Container>
        <Navbar bg="light" variant="light">
          <Container className="navbar-container">
            <Navbar.Brand href="#home">MyFlix-App</Navbar.Brand>
            <Nav className="me-auto navbar-elements__style">
              <Nav.Link cla href="#home">Home</Nav.Link>
              <Nav.Link href="#features">My-Movies</Nav.Link>
              <Nav.Link href="#pricing">Account</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Container>
    );
  }
}