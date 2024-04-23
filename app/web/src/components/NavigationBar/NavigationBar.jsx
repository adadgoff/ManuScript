import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavigationBar = () => {
  return (
      <Navbar expand="lg" className="bg-primary navbar-dark">
        <Container>
          <Navbar.Brand href="/learn">ManuScript</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/learn">Моё обучение</Nav.Link>
              <Nav.Link href="/teach">Преподавание</Nav.Link>
              {/*<NavDropdown title="Язык" id="basic-nav-dropdown">*/}
              {/*  <NavDropdown.Item href="#action/3.1">Русский</NavDropdown.Item>*/}
              {/*  <NavDropdown.Item href="#action/3.2">English</NavDropdown.Item>*/}
              {/*</NavDropdown>*/}
              <Nav.Link href="/profile">Профиль</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavigationBar;