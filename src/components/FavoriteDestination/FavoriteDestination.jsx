import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "../../styles/global.css";

// Data contoh untuk destinasi favorit berdasarkan kategori
const destinationData = {
  Semua: [
    {
      title: "Jakarta -> Bangkok",
      region: "Asia",
      date: "20 - 30 Maret 2023",
      price: "IDR 950.000",
      tag: "Limited!",
      img: "bangkok.png",
    },
    {
      title: "Jakarta -> Sydney",
      region: "Australia",
      date: "5 - 25 Maret 2023",
      price: "IDR 3.650.000",
      tag: "50% OFF",
      img: "bangkok.png",
    },
  ],
  Asia: [
    {
      title: "Jakarta -> Bangkok",
      region: "Asia",
      date: "20 - 30 Maret 2023",
      price: "IDR 950.000",
      tag: "Limited!",
      img: "bangkok.png",
    },
  ],
  Australia: [
    {
      title: "Jakarta -> Sydney",
      region: "Australia",
      date: "5 - 25 Maret 2023",
      price: "IDR 3.650.000",
      tag: "50% OFF",
      img: "bangkok.png",
    },
  ],
  Amerika: [],
  Eropa: [],
  Afrika: [],
};

const FavoriteDestination = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Destinasi yang akan ditampilkan berdasarkan kategori yang dipilih
  const destinations = destinationData[selectedCategory] || [];

  return (
    <Container className="py-5">
      <h3 className="mb-4">Destinasi Favorit</h3>
      {/* Filter Buttons */}
      <Row className="d-flex">
        {Object.keys(destinationData).map((region, index) => (
          <Col xs="auto" className="mb-3" key={index}>
            <Button
              variant="light"
              className="text-dark custom-button"
              onClick={() => setSelectedCategory(region)}
              style={{
                backgroundColor:
                  selectedCategory === region
                    ? "#A084CA"
                    : "rgba(226, 212, 240, 1)",
                color: selectedCategory === region ? "#fff" : "#000",
              }}
            >
              <img src="fi_search.png" alt="" /> {region}
            </Button>
          </Col>
        ))}
      </Row>

      {/* Destination Cards */}
      <Row>
        {destinations.length > 0 ? (
          destinations.map((destination, index) => (
            <Col
              md={4}
              sm={6}
              xs={12}
              key={index}
              className="mb-4 d-flex justify-content-between"
            >
              <Card
                style={{
                  width: "18rem", // Lebar kartu lebih kecil
                  margin: "0 auto",
                }}
              >
                <Card.Img
                  variant="top"
                  src={destination.img}
                  alt={destination.title}
                  style={{
                    height: "150px", // Tinggi gambar lebih kecil
                  }}
                  className="p-2"
                />
                <Card.Body>
                  <Card.Title>{destination.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {destination.region}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    {destination.date}
                  </Card.Text>
                  <Card.Text className="text-danger">
                    Mulai dari <strong>{destination.price}</strong>
                  </Card.Text>
                  {destination.tag && (
                    <span
                      className="badge bg-primary"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "#A084CA",
                      }}
                    >
                      {destination.tag}
                    </span>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">Tidak ada destinasi yang tersedia.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default FavoriteDestination;
