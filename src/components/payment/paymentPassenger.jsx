import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./paymentPassenger.css";

const BookingFormPassenger = ({
  ordererData,
  formData,
  handlePassengerChange,
}) => {
  const [hasLastName, setHasLastName] = useState(true);

  useEffect(() => {
    // Set hasLastName sesuai dengan apakah familyName ada di ordererData.passengers
    if (ordererData?.passengers?.length > 0) {
      const firstPassenger = ordererData.passengers[0];
      setHasLastName(!!firstPassenger.familyName);
    }
  }, [ordererData?.passengers]);

  const passengersToDisplay = ordererData?.orderer?.familyName
    ? ordererData.passengers?.filter(
        (passenger) => passenger.flightType === "departure"
      ) // Filter hanya passenger dengan flightType "departure"
    : formData?.passengers; // Jika tidak, gunakan passengers dari formData

  return (
    <>
      {passengersToDisplay?.length > 0 ? (
        passengersToDisplay.map((passenger, index) => (
          <div key={index}>
            <Card
              style={{
                padding: "15px",
                border: "1px #3C3C3C solid",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Card.Title style={{ marginBottom: "30px", fontWeight: "700" }}>
                Isi Data Penumpang
              </Card.Title>
              <Card.Subtitle
                className="mb-3 text-white"
                style={{
                  backgroundColor: "#3C3C3C",
                  borderRadius: "8px 8px 0px 0px",
                  padding: "10px 15px",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Data Diri Penumpang {index + 1} - {passenger.passengerType}
                {ordererData?.orderer?.familyName && (
                  <img
                    src="Vector (3).png"
                    alt="Icon"
                    style={{
                      position: "absolute",
                      right: "22px", // Adjust the position to your liking
                      top: "8.5%", // Vertically center the icon
                      transform: "translateY(-50%)", // Perfectly center the icon vertically
                      width: "20px", // Adjust icon size as needed
                    }}
                  />
                )}
              </Card.Subtitle>
              <Card.Body>
                <Form style={{ marginTop: "-15px" }}>
                  <Form.Group className="mb-3" controlId={`title-${index}`}>
                    <Form.Label className="custom-label">Title</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="title"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.title || ""}
                    >
                      <option value="">Silahkan Pilih</option>
                      <option value="mr">Mr</option>
                      <option value="mrs">Mrs</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId={`fullName-${index}`}>
                    <Form.Label className="custom-label">
                      Nama Lengkap
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fullname"
                      placeholder="Nama Lengkap"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.fullname || ""}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId={`familyName-${index}`}
                  >
                    <Form.Label column sm="8" className="custom-label">
                      Punya Nama Keluarga?
                    </Form.Label>
                    <Col sm="4" className="text-end">
                      <Form.Check
                        type="switch"
                        id={`hasLastName-${index}`}
                        checked={hasLastName}
                        onChange={(e) => setHasLastName(e.target.checked)}
                        className="custom-switch"
                      />
                    </Col>
                  </Form.Group>

                  {hasLastName && (
                    <Form.Group
                      className="mb-3"
                      controlId={`lastName-${index}`}
                    >
                      <Form.Label className="custom-label">
                        Nama Keluarga
                      </Form.Label>
                      <Form.Control
                        name="familyName"
                        type="text"
                        placeholder="Nama Keluarga"
                        style={{
                          borderRadius: "8px",
                          padding: "10px",
                          border: "1px black solid",
                        }}
                        onChange={(e) => handlePassengerChange(index, e)}
                        value={passenger.familyName || ""}
                      />
                    </Form.Group>
                  )}

                  {/* Additional Fields */}
                  <Form.Group className="mb-3" controlId={`birthDate-${index}`}>
                    <Form.Label className="custom-label">
                      Tanggal Lahir
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="birthDate"
                      placeholder="yyyy-mm-dd"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.birthDate || ""}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId={`citizenship-${index}`}
                  >
                    <Form.Label className="custom-label">
                      Kewarganegaraan
                    </Form.Label>
                    <Form.Control
                      name="citizenship"
                      type="text"
                      placeholder="Indonesia"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.citizenship || ""}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId={`ktp-${index}`}>
                    <Form.Label className="custom-label">
                      KTP / Paspor
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="identityNumber"
                      placeholder=""
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.identityNumber || ""}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId={`publisherCountry-${index}`}
                  >
                    <Form.Label className="custom-label">
                      Publisher Country
                    </Form.Label>
                    <Form.Control
                      name="publisherCountry"
                      type="text"
                      placeholder="Indonesia"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.publisherCountry || ""}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId={`expiredAt-${index}`}>
                    <Form.Label className="custom-label">
                      Tanggal Lahir
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="expiredAt"
                      placeholder="yyyy-mm-dd"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.expiredAt || ""}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p>No passengers available</p>
      )}
    </>
  );
};

export default BookingFormPassenger;
