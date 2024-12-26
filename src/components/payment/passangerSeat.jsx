import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const totalSeats = 72;
const LeftRightSeats = totalSeats / 2;
const resultRows = Math.ceil(totalSeats / 6);

const pasangerSeat = () => {
  // Fungsi untuk menghasilkan elemen berdasarkan kondisi
  const generateSeats = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (
      <Button
        key={start + index}
        className="button-seat text-center"
        style={{ margin: "2px", width: "30px", paddingRight: "20px" }}
      >
        X
      </Button>
    ));
  };

  const generateRows = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (
      <Button
        key={start + index}
        className="button-seat text-center"
        style={{
          margin: "2px",
          width: "55px",
          paddingRight: "15px",
          background: " transparent",
          color: "black",
          border: "0px none transparent",
          fontWeight: "500",
          pointerEvents: "none",
        }}
      >
        {index + 1}
      </Button>
    ));
  };

  // Membuat tombol untuk kursi kiri dan kanan
  const seatsLeft = generateSeats(1, LeftRightSeats); // 1 - 32
  const seatsRight = generateSeats(LeftRightSeats + 1, totalSeats); // 33 - 64
  const totalRows = generateRows(1, resultRows);

  return (
    <div className="">
      <Card
        style={{
          padding: "15px",
          border: "1px #3C3C3C solid",
          borderRadius: "12px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Card.Title style={{ marginBottom: "30px", fontWeight: "700" }}>
          Pilih Kursi
        </Card.Title>
        <Card.Subtitle
          className="mb-3 text-white text-center"
          style={{
            backgroundColor: "#73CA5C",
            borderRadius: "4px 4px 1px 1px",
            padding: "10px 15px",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          Economy - {totalSeats} Seats Available
        </Card.Subtitle>
        <Card.Body>
          <div
            className="d-flex"
            style={{
              justifyContent: "space-between",
              alignItems: "center", // Opsional, untuk menyelaraskan secara vertikal
              width: "100%", // Pastikan flex container memiliki lebar penuh
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0px 8px",
                maxWidth: "120px", // Lebar total = 3 kolom * (lebar tombol + margin)
                margin: "0 auto", // Untuk membuatnya di tengah
              }}
            >
              {seatsLeft}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 0.5fr)",
                gap: "2px 4px",
                maxWidth: "120px", // Lebar total = 3 kolom * (lebar tombol + margin)
                margin: "0 auto", // Untuk membuatnya di tengah
              }}
            >
              {totalRows}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0px 8px",
                maxWidth: "120px", // Lebar total = 3 kolom * (lebar tombol + margin)
                margin: "0 auto", // Untuk membuatnya di tengah
                backgrounColor: "none",
              }}
            >
              {seatsRight}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default pasangerSeat;
