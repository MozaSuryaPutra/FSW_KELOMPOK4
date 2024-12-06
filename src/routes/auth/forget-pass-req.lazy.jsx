import React, { useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
//import TiketkuImage from "../../assets/img/BG-Tiketku.png";
import BgTiketkuImage from "../../../public/BG-Tiketku.png";

export const Route = createLazyFileRoute("/auth/forget-pass-req")({
  component: ResetRequest,
});

function ResetRequest() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);
  return (
    <>
      <Row style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
        <Col
          md={6}
          style={{ overflow: "hidden", height: "100vh", position: "relative" }}
          className="d-none d-md-block"
        >
          <img

            src={BgTiketkuImage}

            alt="Tiketku"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Col>
        <Col md={6}>
          <Form>
            <Container
              className="p-5 d-flex justify-content-center align-items-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100 m-lg-5 m-0">
                <h4 className="mb-4 fw-bold">Lupa Password</h4>
                <Form>
                  <Form.Group as={Col} className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Input Email"
                      style={{
                        fontSize: "14px",
                        lineHeight: "2",
                        borderRadius: "15px",
                      }}
                      required
                      value={email}
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <div className="d-grid">
                        <Button
                          as={Link}
                          href={`/login`}
                          style={{
                            backgroundColor: "white",
                            borderColor: "#7126B5",
                            borderRadius: "15px",
                            lineHeight: "1.7",
                            color: "#7126B5",
                            marginTop: "0.8rem",
                            boxShadow: "4px 4px 10px 2px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          Kembali ke Login
                        </Button>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-grid">
                        <Button
                          type="submit"
                          style={{
                            backgroundColor: "#7126B5",
                            borderColor: "#7126B5",
                            borderRadius: "15px",
                            lineHeight: "1.7",
                            marginTop: "0.8rem",
                            boxShadow: "4px 4px 10px 2px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          Kirim
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Container>
          </Form>
        </Col>
      </Row>
    </>
  );
}
