import { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Modal,
  ListGroup,
  Image,
} from "react-bootstrap";

import { addDays, format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { chooseCheckout } from "../../services/checkout/checkout";
import { getSearchedFlight } from "../../services/homepage/homepage";
import { toast } from "react-toastify";

function ChooseFlight() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Harga - Termurah");
  const userIds = useSelector((state) => {
    const userString = state.auth.user; // Ambil string JSON dari state
    const user = userString ? JSON.parse(userString) : null; // Parse string menjadi objek
    return user?.id; // Kembalikan id jika user ada
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk melacak proses
  const [flightList, setFlight] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const location = useLocation();
  const {
    selectedDepartureCity,
    selectedReturnCity,
    selectedDepartureDate,
    selectedReturnDate,
    selectedClass,
    selectedPassengers,
    customFunction,
    passengersAmount,
    isReturnEnabled,
  } = location.state || {};

  const [selectedDay, setSelectedDay] = useState(selectedDepartureDate || "");

  const {
    data: flightsData,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "flight",
      selectedDepartureCity,
      selectedReturnCity,
      selectedDay,
      selectedReturnDate,
      passengersAmount,
      selectedClass,
    ],
    queryFn: () =>
      getSearchedFlight(
        selectedDepartureCity,
        selectedReturnCity,
        selectedDay,
        selectedReturnDate,
        passengersAmount,
        selectedClass
      ),
    enabled: !!selectedDepartureCity && !!selectedReturnCity,
  });

  const { mutate: chooseCheckouts } = useMutation({
    mutationFn: (body) => chooseCheckout(body),
    onSuccess: (data) => {
      if (data) {
        toast.success("Berhasil Membuat Checkout Biodata");
        localStorage.removeItem("flightSearch"); // Menghapus item
        navigate({
          to: "/checkout-biodata",
          state: {
            data,
            selectedDepartureCity,
            selectedReturnCity,
            selectedDay,
            selectedReturnDate,
            selectedClass,
            selectedPassengers,
          },
        });
      } else {
        console.error("Token or user not found in response");
      }
      setIsSubmitting(false); // Atur state menjadi true

    },
    onError: (err) => {
      console.error("error:", err.message);
      toast.error("Upss!! Kamu belum melakukan login, Silahlan Login terlebih dahulu");
      setIsSubmitting(false); // Atur state menjadi true
    },
  });

  useEffect(() => {
    if (isSuccess && flightsData) {
      setFlight(flightsData);
    } else if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [flightsData, isSuccess, error]);

  useEffect(() => {
    const filtered = flightList.departureFlights?.filter((flight) => {
      const formattedDepartureDate = flight.departureDate.substring(0, 10);
      return formattedDepartureDate === selectedDay;
    });
    setFilteredFlights(filtered);
  }, [flightList, selectedDay]);

  const handleSortChange = (criteria) => {
    setSelectedSort(criteria);

    const sorted = [...filteredFlights];
    switch (criteria) {
      case "Harga - Termurah":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Durasi - Terpendek":
        sorted.sort((a, b) => {
          const durationA = new Date(a.arrivalDate) - new Date(a.departureDate);
          const durationB = new Date(b.arrivalDate) - new Date(b.departureDate);
          return durationA - durationB;
        });
        break;
      case "Keberangkatan - Paling Awal":
        sorted.sort(
          (a, b) => new Date(a.departureDate) - new Date(b.departureDate)
        );
        break;
      case "Keberangkatan - Paling Akhir":
        sorted.sort(
          (a, b) => new Date(b.departureDate) - new Date(a.departureDate)
        );
        break;
      case "Kedatangan - Paling Awal":
        sorted.sort(
          (a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate)
        );
        break;
      case "Kedatangan - Paling Akhir":
        sorted.sort(
          (a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate)
        );
        break;
      default:
        break;
    }

    setFilteredFlights(sorted);
    setShowModal(false);
  };

  const onSubmit = async (event, flightId) => {
    event.preventDefault();
    if (isSubmitting) return; // Cegah klik berulang
    setIsSubmitting(true); // Atur state menjadi true
    const body = {
      passengers: JSON.stringify(selectedPassengers),
      userId: userIds,
      pp: isReturnEnabled,
      flightIds: JSON.stringify({
        departure: flightId,
        return: 0,
      }),
    };

    chooseCheckouts(body);
  };

  const chooseReturns = (event, flightId) => {
    event.preventDefault();

    navigate({
      to: "/choose-return",
      state: {
        flightId,
        selectedDepartureCity,
        selectedReturnCity,
        selectedDay,
        selectedReturnDate,
        selectedClass,
        selectedPassengers,
        isReturnEnabled,
        passengersAmount,
      },
    });
  };

  if (
    !selectedDepartureCity ||
    !selectedReturnCity ||
    !selectedClass ||
    !selectedPassengers
  ) {
    return (
      <div className="text-center">
        <h1>Anda harus memilih terlebih dahulu</h1>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate({ to: "/" })}
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  console.log(selectedPassengers);

  return (
    <>
      <Container className="mt-4">
        {/* Header */}
        <Row
          style={{ fontSize: 20, fontWeight: "bold" }}
          className="mb-5"
        ></Row>
        <Row className="d-flex justify-content-between align-items-center mb-3 ">
          <Col md={9}>
            <Button
              style={{ backgroundColor: "rgba(160, 110, 206, 1)" }}
              className="me-3 w-100 d-flex float-start align-items-center"
            >
              {"<-"} JKT {">"} MLB - 2 Penumpang - Economy
            </Button>
          </Col>
          <Col md={3} className="d-flex justify-content-end align-items-end ">
            <Button
              variant="success"
              onClick={() => navigate({ to: "/" })}
              className="w-100"
              style={{ backgroundColor: "rgba(115, 202, 92, 1)" }}
            >
              Ubah Pencarian
            </Button>
          </Col>
        </Row>
        {/* Navigation Dates */}
        {selectedDepartureDate ? (
          <Row className="mb-4">
            <Col
              md={12}
              className="text-center d-flex justify-content-center flex-wrap gap-1"
            >
              {[...Array(8)].map((_, idx) => {
                const date = addDays(new Date(selectedDepartureDate), idx);
                const formattedDate = format(date, "yyyy-MM-dd");
                const dayName = format(date, "EEEE", { locale: id });

                return (
                  <Button
                    key={idx}
                    variant={
                      selectedDay === formattedDate
                        ? "primary"
                        : "outline-secondary"
                    }
                    onClick={() => setSelectedDay(formattedDate)}
                    className="text-center"
                  >
                    <span>{dayName}</span> <br />
                    <small>{formattedDate}</small>
                  </Button>
                );
              })}
            </Col>
          </Row>
        ) : (
          <p>Tunggu Sebentar</p> // Menampilkan pesan jika
        )}
        ;{/* Main Content */}
        <Row>
          {/* Filter Section */}
          <Col md={3} className="mb-3"></Col>

          {/* Flight Results */}
          <Col md={9}>
            {/* Sort Button */}
            <div className="d-flex align-items-center mb-3 w-100">
              <Button
                variant="outline-primary"
                onClick={() => setShowModal(true)}
                className="ms-auto"
              >
                <img src="prefixwrapper.png" alt="" />
                {selectedSort.split(" - ")[1]}{" "}
                {/* Menampilkan hanya bagian setelah " - " */}
              </Button>
            </div>

            {/* Accordion for Flights */}
            {isLoading ? (
              <div className="text-center mt-4">
                <Image src="ilustrasi (1).png"></Image>
              </div>
            ) : filteredFlights?.length > 0 ? (
              filteredFlights.map((flight, idx) => (
                <>
                <h3>Departure Flight</h3>
                <Accordion
                  key={flight.id}
                  defaultActiveKey="0"
                  className="mb-3"
                >
                  <Accordion.Item eventKey={idx}>
                    <Accordion.Header>
                      <div className="d-flex justify-content-between w-100 flex-wrap">
                        <div className="d-flex align-items-start gap-2">
                          <img
                            src="Thumbnail.png"
                            alt="Thumbnail"
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <div>
                            <ul
                              className="mb-0 ps-0"
                              style={{ listStyle: "none" }}
                            >
                              <li>Jet Air - Economy</li>
                              <br />
                              <li>
                                <Row
                                  className="d-flex"
                                  style={{ width: "100%" }}
                                >
                                  <Col
                                    md={2}
                                    sm={12}
                                    className="d-flex flex-column custom-col"
                                    style={{ gap: "1px" }}
                                  >
                                    <div style={{ fontWeight: "bold" }}>
                                      {flight.departureDate
                                        .toString()
                                        .substring(11, 16)}
                                    </div>
                                    <div>JKT</div>
                                  </Col>

                                  <Col
                                    md={7}
                                    className="d-flex flex-column align-items-center"
                                  >
                                    <div style={{ fontWeight: "bold" }}>
                                      4h 0m
                                    </div>
                                    <div
                                      style={{ fontWeight: "bold", margin: 0 }}
                                    >
                                      <img
                                        src="Arrow.png"
                                        alt="Arrow"
                                        style={{
                                          maxWidth: "100%",
                                          height: "auto",
                                        }}
                                      />
                                    </div>
                                    <div>Direct</div>
                                  </Col>
                                  <Col
                                    md={2}
                                    sm={12}
                                    className="d-flex flex-column custom-col"
                                    style={{ gap: "1px" }}
                                  >
                                    <div style={{ fontWeight: "bold" }}>
                                      {flight.arrivalDate
                                        .toString()
                                        .substring(11, 16)}
                                    </div>
                                    <div>JKT</div>
                                  </Col>
                                  <Col
                                    md={1}
                                    className="d-flex justify-content-center align-items-center"
                                  >
                                    <img src="bagasi.png" alt="" />
                                  </Col>
                                </Row>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="d-flex flex-column gap-1 custom-div "
                          style={{ marginTop: "5%" }}
                        >
                          <strong>IDR {flight.price.toLocaleString()}</strong>
                          <Button
                          disabled={isSubmitting}
                            onClick={(event) => {
                              if (isReturnEnabled) {
                                chooseReturns(event, flight.id); // Panggil chooseReturn jika isReturnEnabled true
                              } else {
                                onSubmit(event, flight.id); // Panggil onSubmit jika isReturnEnabled false
                              }
                            }}
                            variant={isSubmitting?"secondary":"primary"}
                          >
                            {isSubmitting? "Memproses...":"Pilih"}
                          </Button>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <p style={{ color: "rgba(75, 25, 121, 1)" }}>
                            <strong>Detail Penerbangan</strong>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex">
                          <p>
                            <strong>
                              {flight.departureDate
                                .toString()
                                .substring(11, 16)}
                            </strong>
                          </p>
                          <p
                            style={{ color: "rgba(160, 110, 206, 1)" }}
                            className="ms-auto"
                          >
                            Keberangkatan
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          {flight.departureDate.toString().substring(0, 10)}
                        </p>
                        <p>{flight.departureAirport.name}</p>
                        <hr style={{ width: "50%", margin: "0 auto" }}></hr>
                      </Row>
                      <Row className="d-flex flex-column">
                        {/* Baris untuk nama maskapai dan nomor penerbangan */}
                        <Col>
                          <div className="d-flex align-items-start gap-2">
                            <img
                              src="Thumbnail.png"
                              alt="Thumbnail"
                              style={{
                                width: "20px",
                                height: "20px",
                                opacity: "0",
                              }}
                            />
                            <div>
                              <ul
                                className="mb-0 ps-0"
                                style={{
                                  listStyle: "none",
                                  fontWeight: "bold",
                                }}
                              >
                                <li>Jet Air - {flight.class}</li>

                                <li>{flight.airplane.airplaneCode}</li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                        <br></br>

                        {/* Baris untuk ikon dan informasi */}
                        <Col>
                          <div className="d-flex align-items-start gap-2">
                            <img
                              src="Thumbnail.png"
                              alt="Thumbnail"
                              style={{ width: "20px", height: "20px" }}
                            />
                            <div>
                              <strong className="d-block mb-1">
                                Informasi :
                              </strong>
                              <ul
                                className="mb-0 ps-0"
                                style={{ listStyle: "none" }}
                              >
                                <li>Baggage {flight.airplane.baggage} kg</li>
                                <li>
                                  Cabin baggage {flight.airplane.cabinBaggage}{" "}
                                  kg
                                </li>
                                <li>In Flight Entertainment</li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                        <br></br>
                        <hr style={{ width: "50%", margin: "0 auto" }}></hr>
                      </Row>
                      <Row>
                        <Col className="d-flex">
                          <p>
                            <strong>
                              {flight.arrivalDate.toString().substring(11, 16)}
                            </strong>
                          </p>
                          <p
                            style={{ color: "rgba(160, 110, 206, 1)" }}
                            className="ms-auto"
                          >
                            Kedatangan
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <p>{flight.arrivalDate.toString().substring(0, 10)}</p>
                        {/* <p>{flight.destinationAirport.id}</p> */}
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                </>
              ))
            ) : (
              <div className="text-center mt-4">
                <Image src="ilustrasi.png"></Image>
              </div>
            )}
          </Col>
        </Row>
        {/* Sort Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Urutkan Berdasarkan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              {[
                { label: "Termurah", value: "Harga - Termurah" },
                { label: "Terpendek", value: "Durasi - Terpendek" },
                { label: "Paling Awal", value: "Keberangkatan - Paling Awal" },
                {
                  label: "Paling Akhir",
                  value: "Keberangkatan - Paling Akhir",
                },
                { label: "K. Awal", value: "Kedatangan - Paling Awal" },
                { label: "K. Akhir", value: "Kedatangan - Paling Akhir" },
              ].map((sortOption, idx) => (
                <ListGroup.Item
                  key={idx}
                  action
                  onClick={() => handleSortChange(sortOption.value)}
                  className={
                    selectedSort === sortOption.value
                      ? "d-flex justify-content-between align-items-center bg-light"
                      : "d-flex justify-content-between align-items-center"
                  }
                >
                  {sortOption.label}
                  {selectedSort === sortOption.value && (
                    <span className="text-success ms-2">✔</span>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowModal(false)}>
            Pilih
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default ChooseFlight;
