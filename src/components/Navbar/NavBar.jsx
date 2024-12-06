import React, { useEffect, useState } from "react";
import { FiList, FiBell, FiUser } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";

import { useNavigate } from "@tanstack/react-router";
const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        {/* Brand */}
        <Navbar.Brand
          onClick={() => navigate({ to: "/" })}
          className="text-primary"
        >
          <Image src="./logo.png" fluid />
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="navbarContent" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="navbarContent">
          <Nav className="me-auto">{/* Placeholder for future links */}</Nav>

          {/* Login Button or Icon Group */}
          {!token ? (
            <Button
              variant="primary"
              onClick={() => navigate({ to: "/auth/login" })}
              style={{
                backgroundColor: "#7126B5",
                borderColor: "#7126B5",
              }}
              className="d-flex align-items-center"
            >
              <FaUser className="me-2" />
              Masuk
            </Button>
          ) : (
            <div className="d-flex align-items-center">
              <FiList
                onClick={() => navigate({ to: "/orderHistory" })}
                size={20}
                className="me-3"
              />
              <FiBell
                onClick={() => navigate({ to: "/notifications" })}
                size={20}
                className="me-3"
              />
              <FiUser onClick={() => navigate({ to: "/akun" })} size={20} />
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
