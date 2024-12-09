import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { setUser } from "../../redux/slices/auth";
import BgTiketkuImage from "/BG-Tiketku.png?url";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Register Form Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { mutate: registerUser } = useMutation({
    mutationFn: (body) => register(body),
    onSuccess: (data) => {
      toast.success("Registration successful! Please log in.");
      dispatch(setUser(data.user));
      navigate({ to: "/login" });
    },
    onError: (err) => {
      console.error("Registration error:", err);
      toast.error(err.message || "Failed to register. Please try again.");
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const body = {
      name,
      email,
      phoneNumber,
      password,
    };
    registerUser(body);
  };

  return (
    <Container fluid className="h-100" style={{ backgroundColor: "#F8F8F8" }}>
      <Row className="g-0 h-100">
        <Col xs={12} md={6} className="p-0">
          <img
            src={BgTiketkuImage}
            alt="Background"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Card
            className="p-4 w-100"
            style={{ maxWidth: "400px", border: "none" }}
          >
            <h3 className="text-center mb-4" style={{ fontWeight: "700" }}>
              Daftar
            </h3>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Contoh: johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+62"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Buat Password</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: "12px" }}
                  />
                  <Button
                    variant="link"
                    onClick={togglePassword}
                    style={{ textDecoration: "none" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#6C63FF",
                  border: "none",
                }}
              >
                Daftar
              </Button>
            </Form>
            <p className="text-center mt-4">
              Sudah punya akun?{" "}
              <a href="/login" style={{ color: "#6C63FF", fontWeight: "500" }}>
                Masuk di sini
              </a>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
