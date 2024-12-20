import React, { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
//import CityPopup from "../CityPopup/cityPopup";
import Container from "react-bootstrap/Container";
import DatePopup from "../DatePopup/DatePopup";
import DestinationPopup from "../DestinationPopup/DestinationPopup";
import ClassPopup from "../ClassPopup/ClassPopup";
import OneDatePopup from "../OneDatePopup/OneDatePopup";
import PassengersPopup from "../PassengersPopup/PassengeresPopup";
import ReturnPopup from "../ReturnPopup/ReturnPopup";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import Airplanelogo from "/plane-logo-Image.png";
import Planelogo from "/plane.png";
import Penumpang from "/penumpang.png";
import Vector from "/Vector.png";
import Return from "/return.png";
import id from "date-fns/locale/id"; // Import untuk format bahasa Indonesia jika diperlukan
const SearchBox = () => {
  const [modalShow, setModalShow] = useState(false); // State untuk modal destinasi
  const [returnmodalShow, setReturnModalShow] = useState(false); // State untuk modal destinasi
  const [dateModalShow, setDateModalShow] = useState(false); // State untuk modal tanggal
  const [ClassModalShow, setClassModalShow] = useState(false); // State untuk modal Class
  const [PassengersModalShow, setPassengersModalShow] = useState(false); // State untuk modal Class
  const [isReturnEnabled, setIsReturnEnabled] = useState(false); // State untuk switch
  const [selectedDepartureCity, setSelectedDepartureCity] = useState(""); // State untuk milih kota
  const [selectedReturnCity, setSelectedReturnCity] = useState(""); // State untuk milih kota kemana
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(""); // State untuk menyimpan tanggal keberangkatan (format YYYY-MM-DD)
  const [selectedReturnDate, setSelectedReturnDate] = useState(""); // State untuk tanggal kembali
  const [selectedClass, setSelectedClass] = useState(""); // Tambahkan state untuk kelas
  const [selectedPassengers, setSelectedPassengers] = useState({
    adult: 0,
    child: 0,
    baby: 0,
  });
  const [validated, setValidated] = useState(false);
  const [passengersAmount, setPassengersAmount] = useState(0);
  const flightSearch = {
    selectedDepartureCity,
    selectedReturnCity,
    selectedDepartureDate,
    selectedReturnDate,
    selectedClass,
    selectedPassengers,
    passengersAmount,
    isReturnEnabled,
  };
  // State untuk jumlah penumpang
  const navigate = useNavigate();

  const handleSelectCounts = (counts) => {
    setSelectedPassengers(counts); // Update state dengan jumlah penumpang yang dipilih
  };
  const swapCities = () => {
    setSelectedDepartureCity((prevDepartureCity) => {
      setSelectedReturnCity(selectedDepartureCity); // Set departure ke arrival
      return selectedReturnCity; // Set arrival ke departure
    });
  };
  const handleSelectDates = (dates) => {
    const [departure, returnDate] = dates;
    setSelectedDepartureDate(departure.format("YYYY-MM-DD"));
    setSelectedReturnDate(returnDate.format("YYYY-MM-DD"));
  };
  const formattedReturnDate = selectedReturnDate
    ? format(parseISO(selectedReturnDate), "d MMMM yyyy", { locale: id })
    : "Pilih Tanggal";

  const handleSwitchChange = () => {
    setIsReturnEnabled(!isReturnEnabled); // Toggle status switch
    if (!isReturnEnabled) {
      setSelectedReturnDate(""); // Reset return date when switch is turned off
    }
  };
  const formattedDepartureDate = selectedDepartureDate
    ? format(parseISO(selectedDepartureDate), "d MMMM yyyy", { locale: id })
    : "Pilih Tanggal";

  const getTotalPassengers = () => {
    return selectedPassengers.adult + selectedPassengers.child;
  };

  useEffect(() => {
    // Pastikan selectedPassengers tersedia dan menghitung jumlah penumpang
    if (selectedPassengers) {
      const getTotalPassengers = () => {
        return selectedPassengers.adult + selectedPassengers.child;
      };
      const totalPassengers = getTotalPassengers();
      setPassengersAmount(totalPassengers); // Update state dengan hasil perhitungan
    }
  }, [selectedPassengers]);
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validasi input
    if (
      !selectedDepartureCity ||
      !selectedReturnCity ||
      !selectedDepartureDate ||
      !selectedClass ||
      !selectedPassengers ||
      !passengersAmount
    ) {
      toast.warn("Isi Semua Terlebih Dahulu");
      return;
    }

    // Validasi jika isReturnEnable true
    if (isReturnEnabled && !selectedReturnDate) {
      toast.warn("Isi Semua Terlebih Dahulu");
      return;
    }

    toast.success("Berhasil Melakukan Pencarian");
    navigate({ to: "/choose", state: flightSearch });
  };
  console.log(passengersAmount);
  return (
    <>
      {/* <style>{`

  // .custom-input::placeholder {
  
  //   // font-size: 0.3vw; 
  //   // font-weight: 600; 


  // }
//   .custom-input {
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// }
`}</style> */}
      <div>
        <Row className="justify-content-center">
          <Col md={12} sm={12} xs={12}>
            <Form
              onSubmit={handleSubmit}
              className="rounded shadow-lg p-4 bg-white  position-relative"
            >
              <Row className="mb-4">
                <Col xs={12}>
                  <p style={{ fontSize: 20, fontWeight: "bold" }}>
                    Pilih Jadwal Penerbangan spesial di{" "}
                    <span style={{ color: "#7126B5", fontWeight: "bold" }}>
                      Tiketku!
                    </span>
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={5} sm={12}>
                  <Form.Group
                    controlId="fromCity"
                    className="mb-3 d-flex align-items-center"
                    onClick={() => setModalShow(true)}
                  >
                    <Form.Label className="fw-bold mb-1 me-2 d-flex align-items-center">
                      <img
                        src={Planelogo}
                        alt=""
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                        }}
                      />
                      <span style={{ color: "#8A8A8A", fontSize: 12 }}>
                        From
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pilih Kota"
                      readOnly
                      required
                      value={selectedDepartureCity.name || "Pilih Kota"}
                      className="border-0 border-bottom flex-grow-1 custom-input"
                      style={{
                        borderRadius: 0,
                        outline: "none",
                        boxShadow: "none",
                        cursor: "pointer",
                        fontSize: "2vw",
                        color: "#7126B5" || "#FFFFFF",
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col
                  md={2}
                  sm={12}
                  className="d-flex justify-content-center align-items-center"
                >
                  <img onClick={swapCities} src={Return} alt="" />
                </Col>
                <Col md={5} sm={12}>
                  <Form.Group
                    controlId="toCity"
                    className="mb-3 d-flex align-items-center"
                    onClick={() => setReturnModalShow(true)}
                  >
                    <Form.Label className="fw-bold mb-1 me-2 d-flex align-items-center">
                      <img
                        src={Planelogo}
                        alt=""
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                        }}
                      />
                      <span style={{ color: "#8A8A8A", fontSize: 12 }}>To</span>
                      <span style={{ color: "white" }}>xx</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Pilih Kota"
                      value={selectedReturnCity.name || "Pilih Kota"}
                      readOnly
                      className="border-0 border-bottom flex-grow-1  custom-input"
                      style={{
                        borderRadius: 0,
                        outline: "none",
                        boxShadow: "none",
                        cursor: "pointer",
                        fontSize: "2vw",
                        color: "#7126B5" || "#FFFFFF",
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={5} className="d-flex align-items-center ">
                  <Form.Label className="fw-bold mb-1 me-2 d-flex align-items-center">
                    <img
                      src={Vector}
                      alt=""
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "8px",
                      }}
                    />
                    <span style={{ color: "#8A8A8A", fontSize: 12 }}>Date</span>
                  </Form.Label>

                  {/* Kolom Tanggal Keberangkatan */}
                  <Col md={3.5} xs={4.5} className="mb-3">
                    <div className="d-flex flex-column gap-2">
                      <Form.Label>
                        <span
                          style={{
                            color: "#8A8A8A",
                            fontSize: "clamp(10px, 1vw, 12px)", // Responsif dengan zoom
                            paddingLeft: "10px",
                          }}
                        >
                          Departure
                        </span>
                      </Form.Label>
                      <Form.Group
                        controlId="departureDate"
                        className="d-flex align-items-center"
                        onClick={() => setDateModalShow(true)}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Pilih Tanggal"
                          readOnly
                          value={formattedDepartureDate}
                          className="border-0 border-bottom flex-grow-1 custom-input"
                          style={{
                            borderRadius: 0,
                            outline: "none",
                            boxShadow: "none",
                            cursor: "pointer",
                            fontSize: "1.4vw",
                            color: "#7126B5" || "#FFFFFF",
                          }}
                        />
                      </Form.Group>
                    </div>
                  </Col>

                  {/* Spacer untuk jarak antar kolom */}
                  <Col md={1} xs={2}></Col>

                  {/* Kolom Tanggal Kembali */}
                  <Col md={3.5} xs={4.5} className="mb-3">
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <Form.Label>
                          <span
                            style={{
                              color: "#8A8A8A",
                              fontSize: "clamp(10px, 1vw, 12px)",
                              paddingLeft: "10px",
                            }}
                          >
                            Return
                          </span>
                        </Form.Label>
                      </div>
                      <Form.Group
                        controlId="returnDate"
                        className="d-flex align-items-center"
                        onClick={() => setDateModalShow(true)}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Pilih Tanggal"
                          readOnly
                          value={formattedReturnDate}
                          disabled={!isReturnEnabled} // Kolom aktif atau tidak bergantung pada status switch
                          className="border-0 border-bottom flex-grow-1 custom-input"
                          style={{
                            borderRadius: 0,
                            outline: "none",
                            boxShadow: "none",
                            fontSize: "1.4vw",
                            color: "#7126B5" || "#FFFFFF",
                            cursor: isReturnEnabled ? "pointer" : "not-allowed",
                          }}
                        />
                      </Form.Group>
                    </div>
                  </Col>

                  {/* <Col className="mb-5 align-items-center">
                    <Form.Label>
                      <Form.Check type="switch" />
                    </Form.Label>
                  </Col> */}
                </Col>
                <Col md={2}>
                  <Form.Check
                    type="switch"
                    id="returnSwitch"
                    onChange={handleSwitchChange}
                    label="PP"
                  />
                </Col>
                <Col md={5} className="d-flex align-items-center ">
                  <Form.Label className="fw-bold mb-1 me-2 d-flex align-items-center">
                    <img
                      src={Penumpang}
                      alt=""
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "8px",
                      }}
                    />
                    <span style={{ color: "#8A8A8A", fontSize: 12 }}>To</span>
                    <span style={{ color: "white" }}>xx</span>
                  </Form.Label>

                  {/* Kolom Tanggal Keberangkatan */}
                  <Col md={3.5} xs={4.5} className="mb-2">
                    <Form.Label>
                      <span
                        style={{
                          color: "#8A8A8A",
                          fontSize: "clamp(10px, 1vw, 12px)",
                          paddingLeft: "10px",
                        }}
                      >
                        Passengers
                      </span>
                    </Form.Label>
                    <Form.Group
                      controlId="departureDate"
                      className="d-flex align-items-center"
                      onClick={() => setPassengersModalShow(true)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Penumpang"
                        value={
                          getTotalPassengers() > 0
                            ? `${getTotalPassengers()} Penumpang`
                            : "Jumlah Penumpang"
                        }
                        readOnly
                        className="border-0 border-bottom flex-grow-1  custom-input"
                        style={{
                          borderRadius: 0,
                          outline: "none",
                          boxShadow: "none",
                          cursor: "pointer",
                          fontSize: "1.4vw",
                          color: "#7126B5" || "#FFFFFF",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1} xs={2}></Col>
                  {/* Kolom Tanggal Kembali */}
                  <Col md={3.5} xs={4.5} className="mb-2 align-items-center">
                    <Form.Label className>
                      <span
                        style={{
                          color: "#8A8A8A",
                          fontSize: "clamp(10px, 1vw, 12px)",
                          paddingLeft: "10px",
                        }}
                      >
                        Seat Class
                      </span>
                    </Form.Label>

                    <Form.Group
                      controlId="returnDate"
                      className="d-flex align-items-center"
                      onClick={() => setClassModalShow(true)}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Jenis Kursi"
                        readOnly
                        value={selectedClass || "Pilih Kelas"}
                        className="border-0 border-bottom flex-grow-1  custom-input"
                        style={{
                          borderRadius: 0,
                          outline: "none",
                          boxShadow: "none",
                          cursor: "pointer",
                          fontSize: "1.4vw",
                          color: "#7126B5" || "#FFFFFF",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Col>
              </Row>

              <Row className="justify-content-center mt-5">
                <Container fluid className="p-0">
                  <Col
                    xs={12}
                    className="position-absolute"
                    style={{ bottom: 0, left: 0, right: 0 }}
                  >
                    <Button
                      type="submit"
                      // onClick={() =>
                      //   navigate({ to: "/choose", state: flightSearch })
                      // }
                      className="w-100"
                      style={{
                        backgroundColor: "#7126B5",
                        borderRadius: "0 0 5px 5px",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        Cari Penerbangan
                      </span>
                    </Button>
                  </Col>
                </Container>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
      {isReturnEnabled ? (
        <DatePopup
          show={dateModalShow}
          handleClose={() => setDateModalShow(false)}
          onSelectDates={handleSelectDates}
        />
      ) : (
        <OneDatePopup
          show={dateModalShow}
          handleClose={() => setDateModalShow(false)}
          onSelectDate={(date) => setSelectedDepartureDate(date)} // Simpan tanggal yang dipilih
        />
      )}

      <ClassPopup
        show={ClassModalShow}
        handleClose={() => setClassModalShow(false)}
        onSelectClass={(className) => setSelectedClass(className)} // Update state dengan kelas yang dipilih
      />

      <PassengersPopup
        show={PassengersModalShow}
        handleClose={() => setPassengersModalShow(false)}
        onSelectCounts={handleSelectCounts} // Kirim fungsi untuk menyimpan data penumpang
      />
      <DestinationPopup
        show={modalShow}
        handleClose={() => setModalShow(false)}
        onSelectCity={(city) => {
          setSelectedDepartureCity(city); // Set kota yang dipilih
          setModalShow(false); // Tutup modal
        }}
      />

      <ReturnPopup
        show={returnmodalShow}
        handleClose={() => setReturnModalShow(false)}
        onSelectCity={(city) => {
          setSelectedReturnCity(city); // Set kota yang dipilih
          setReturnModalShow(false); // Tutup modal
        }}
      />
    </>
  );
};

export default SearchBox;
