import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import "./paymentPemesanan.css";

const BookingForm = ({ ordererData, handleOrdererChange }) => {
  const [hasLastName, setHasLastName] = useState(true);
  const [DataOrderer, setDataOrderer] = useState({ ...ordererData });

  useEffect(() => {
    // Periksa apakah ordererData memiliki lastName
    if (ordererData?.orderer?.familyName) {
      setHasLastName(true);
    } else {
      setHasLastName(false);
    }

    // Sinkronkan perubahan ordererData ke DataOrderer
    setDataOrderer({ ...ordererData });
  }, [ordererData]);
  console.log("Data orderer : ", DataOrderer);
  return (
    <Card
      className=""
      style={{
        padding: "15px",
        border: "1px #3C3C3C solid",
        borderRadius: "12px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Card.Title style={{ marginBottom: "30px", fontWeight: "700" }}>
        Isi Data Pemesanan
      </Card.Title>
      <Card.Subtitle
        className="mb-3 text-white"
        style={{
          backgroundColor: "#3C3C3C",
          borderRadius: "8px 8px 0px 0px",
          padding: "10px 15px",
          fontSize: "1rem",
          fontWeight: "500",
          position: "relative", // This makes the parent container for positioning the icon
        }}
      >
        Data Diri Pemesan
        {DataOrderer?.orderer?.fullname && (
          <img
            src="Vector (3).png"
            alt="Icon"
            style={{
              position: "absolute",
              right: "10px", // Adjust the position to your liking
              top: "50%", // Vertically center the icon
              transform: "translateY(-50%)", // Perfectly center the icon vertically
              width: "20px", // Adjust icon size as needed
            }}
          />
        )}
      </Card.Subtitle>

      <Card.Body>
        <Form style={{ marginTop: "-15px" }}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label className="custom-label">Nama Lengkap</Form.Label>
            <Form.Control
              name="fullname"
              type="text"
              placeholder="Nama Lengkap"
              defaultValue={DataOrderer?.orderer?.fullname || ""}
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px black solid",
              }}
              onChange={handleOrdererChange}
            />
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="8" className="custom-label">
              Punya Nama Keluarga?
            </Form.Label>
            <Col sm="4" className="text-end switch d-flex justify-content-end">
              <Form.Check
                type="switch"
                id="hasLastName"
                checked={hasLastName}
                onChange={(e) => {
                  setHasLastName(e.target.checked);
                  if (!e.target.checked) {
                    handleOrdererChange({
                      target: { name: "familyName", value: undefined },
                    });
                  } else {
                    handleOrdererChange({
                      target: { name: "familyName", value: "" },
                    });
                  }
                }}
                className="custom-switch"
              />
            </Col>
          </Form.Group>

          {hasLastName && (
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label className="custom-label">Nama Keluarga</Form.Label>
              <Form.Control
                name="familyName"
                type="text"
                placeholder="Nama Keluarga"
                defaultValue={DataOrderer?.orderer?.familyName || ""}
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px black solid",
                }}
                onChange={handleOrdererChange}
              />
            </Form.Group>
          )}

          {/* Nomor Telepon */}
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label className="custom-label">Nomor Telepon</Form.Label>
            <Form.Control
              name="numberPhone"
              type="text"
              placeholder="Nomor Telepon"
              defaultValue={DataOrderer?.orderer?.numberPhone || ""}
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px black solid",
              }}
              onChange={handleOrdererChange}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="custom-label">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Contoh: johndoe@gmail.com"
              defaultValue={DataOrderer?.orderer?.email || ""}
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px black solid",
              }}
              onChange={handleOrdererChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookingForm;
