import React from "react";
import { FaUser } from "react-icons/fa";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "@tanstack/react-router";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        {/* Brand */}

        <Navbar.Brand as={Link} to="/" className="text-primary">
          <Image src="./public/logo.png" fluid />
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="navbarContent" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="navbarContent">
          <Nav className="me-auto">{/* Placeholder for future links */}</Nav>

          <Button variant="primary" className="d-flex align-items-center">
            <FaUser className="me-2" />
            <p>Masuk</p>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
