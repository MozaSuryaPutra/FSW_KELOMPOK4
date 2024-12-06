import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Row, Col, Form, Button } from "react-bootstrap";
//import TiketkuImage from "../../assets/img/BG-Tiketku.png";
import BgTiketkuImage from "../../../public/BG-Tiketku.png";

export const Route = createLazyFileRoute("/auth/forget-pass")({
  component: ResetPassword,
});

function ResetPassword() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#EAE7F8",
      }}
    >
      <div
        style={{
          flex: 1,

          backgroundImage: `url(${BgTiketkuImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            Atur Ulang Kata Sandi
          </h3>
          <Form>
            <Form.Group controlId="newPassword">
              <Form.Label>Kata Sandi Baru</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan kata sandi baru"
              />
            </Form.Group>
            <Form.Group
              controlId="confirmPassword"
              style={{ marginTop: "15px" }}
            >
              <Form.Label>Konfirmasi Kata Sandi</Form.Label>
              <Form.Control
                type="password"
                placeholder="Konfirmasi kata sandi"
              />
            </Form.Group>
            <Button
              type="submit"
              style={{
                marginTop: "20px",
                width: "100%",
                backgroundColor: "#6C63FF",
                border: "none",
              }}
            >
              Simpan Kata Sandi
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
