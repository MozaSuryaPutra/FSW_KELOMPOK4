import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./paymentPassenger.css";

const BookingFormPassenger = ({
  ordererData,
  formData,
  handlePassengerChange,
}) => {
  const [hasLastName, setHasLastName] = useState(false);

  useEffect(() => {
    // Set hasLastName sesuai dengan apakah familyName ada di ordererData.passengers
    if (ordererData?.passengers?.length > 0) {
      const firstPassenger = ordererData.passengers[0];
      setHasLastName(!!firstPassenger.fullname);
    }
  }, [ordererData?.passengers]);

  const passengersToDisplay = ordererData?.orderer?.fullname
    ? ordererData?.passengers?.filter(
        (passenger) =>
          passenger?.flightType === "departure" &&
          passenger?.passengerType !== "baby"
      )
    : formData?.passengers?.filter(
        (passenger) => passenger?.passengerType !== "baby"
      );

  // Jika tidak, gunakan passengers dari formData
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan harus 2 digit
    const day = String(date.getDate()).padStart(2, "0"); // tanggal harus 2 digit
    return `${year}-${month}-${day}`; // Mengubah format ke yyyy-MM-dd
  };
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
                {ordererData?.orderer?.fullname && (
                  <img
                    src="Vector (3).png"
                    alt="Icon"
                    style={{
                      position: "absolute",
                      right: "22px", // Adjust the position to your liking
                      top: "9.2%", // Vertically center the icon
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
                      {passenger.passengerType === "adult" ? (
                        <>
                          <option value="">Silahkan Pilih</option>
                          <option value="mr">Mr</option>
                          <option value="mrs">Mrs</option>
                        </>
                      ) : (
                        <>
                          <option value="">Silahkan Pilih</option>
                          <option value="boy">Boy</option>
                          <option value="girl">Girl</option>
                        </>
                      )}
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
                        onChange={(e) => {
                          setHasLastName(e.target.checked);
                          // Jika hasLastName berubah menjadi false, kosongkan familyName
                          if (!e.target.checked) {
                            handlePassengerChange(index, {
                              target: { name: "familyName", value: undefined },
                            });
                          } else {
                            handlePassengerChange(index, {
                              target: { name: "familyName", value: "" },
                            });
                          }
                        }}
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
                        value={passenger.familyName || " " || "Kosong"}
                        required={hasLastName} // Set as required if hasLastName is true
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
                      value={formatDate(passenger.birthDate) || ""}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId={`citizenship-${index}`}
                  >
                    <Form.Label className="custom-label">
                      Kewarganegaraan
                    </Form.Label>
                    <Form.Select
                      name="citizenship"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.citizenship || ""}
                    >
                      <option value="">Pilih kewarganegaraan</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Vietnam">Vietnam</option>
                    </Form.Select>
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
                    <Form.Select
                      name="publisherCountry"
                      style={{
                        borderRadius: "8px",
                        padding: "10px",
                        border: "1px black solid",
                      }}
                      onChange={(e) => handlePassengerChange(index, e)}
                      value={passenger.publisherCountry || ""}
                    >
                      <option value="">Select a country</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Vietnam">Vietnam</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId={`expiredAt-${index}`}>
                    <Form.Label className="custom-label">
                      Berlaku Sampai
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
                      value={formatDate(passenger.expiredAt) || ""}
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
