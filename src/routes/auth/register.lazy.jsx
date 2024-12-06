import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


import { useSelector } from "react-redux";

import BgTiketkuImage from "../../../public/BG-Tiketku.png";


export const Route = createLazyFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const isSuccess = true;

    if (isSuccess) {
      navigate({ to: "/" });
    }
  };

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

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
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label style={{ fontWeight: "500" }}>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label style={{ fontWeight: "500" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Contoh: johndoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label style={{ fontWeight: "500" }}>
                  Nomor Telepon
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+62"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label style={{ fontWeight: "500" }}>
                  Buat Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Buat Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
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

export default Register;
