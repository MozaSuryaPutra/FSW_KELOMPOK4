import React, { useState, useEffect } from "react";

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
// Data dummy penerbangan
const flightData = [
  {
    id: 1,
    airline: "Jet Air",
    class: "Economy",
    departureTime: "07:00",
    arrivalTime: "11:00",
    departureAirport: "Soekarno Hatta - Terminal 1A Domestik",
    arrivalAirport: "Melbourne International Airport",
    duration: "4 jam (Direct)",
    price: 4950000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "In-Flight Entertainment",
    date: "2023-03-01",
  },
  {
    id: 2,
    airline: "Jet Air",
    class: "Economy",
    departureTime: "08:00",
    arrivalTime: "12:00",
    departureAirport: "Soekarno Hatta - Terminal 1A Domestik",
    arrivalAirport: "Melbourne International Airport",
    duration: "4 jam (Direct)",
    price: 6950000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "In-Flight Entertainment",
    date: "2023-03-02",
  },
  {
    id: 3,
    airline: "Garuda Indonesia",
    class: "Economy",
    departureTime: "09:00",
    arrivalTime: "13:00",
    departureAirport: "Soekarno Hatta - Terminal 2E",
    arrivalAirport: "Sydney International Airport",
    duration: "4 jam 30 menit (Direct)",
    price: 7500000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "In-Flight Entertainment",
    date: "2023-03-03",
  },
  {
    id: 4,
    airline: "AirAsia",
    class: "Economy",
    departureTime: "10:00",
    arrivalTime: "14:00",
    departureAirport: "Soekarno Hatta - Terminal 2D",
    arrivalAirport: "Kuala Lumpur International Airport",
    duration: "4 jam (Direct)",
    price: 4500000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "None",
    date: "2023-03-01",
  },
  {
    id: 5,
    airline: "Lion Air",
    class: "Economy",
    departureTime: "11:00",
    arrivalTime: "15:00",
    departureAirport: "Soekarno Hatta - Terminal 1C Domestik",
    arrivalAirport: "Denpasar Ngurah Rai Airport",
    duration: "3 jam 30 menit (Direct)",
    price: 5500000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "In-Flight Entertainment",
    date: "2023-03-02",
  },
  {
    id: 6,
    airline: "Singapore Airlines",
    class: "Business",
    departureTime: "12:00",
    arrivalTime: "16:00",
    departureAirport: "Soekarno Hatta - Terminal 3",
    arrivalAirport: "Singapore Changi Airport",
    duration: "3 jam 30 menit (Direct)",
    price: 15000000,
    baggage: "40 kg",
    cabinBaggage: "15 kg",
    entertainment: "In-Flight Entertainment, Wifi",
    date: "2023-03-03",
  },
  {
    id: 7,
    airline: "Emirates",
    class: "Economy",
    departureTime: "13:00",
    arrivalTime: "17:00",
    departureAirport: "Soekarno Hatta - Terminal 3",
    arrivalAirport: "Dubai International Airport",
    duration: "8 jam (Direct)",
    price: 10500000,
    baggage: "30 kg",
    cabinBaggage: "10 kg",
    entertainment: "In-Flight Entertainment, Wifi",
    date: "2023-03-01",
  },
  {
    id: 8,
    airline: "Qatar Airways",
    class: "Economy",
    departureTime: "14:00",
    arrivalTime: "18:00",
    departureAirport: "Soekarno Hatta - Terminal 3",
    arrivalAirport: "Hamad International Airport",
    duration: "8 jam (Direct)",
    price: 12000000,
    baggage: "30 kg",
    cabinBaggage: "10 kg",
    entertainment: "In-Flight Entertainment, Wifi",
    date: "2023-03-02",
  },
  {
    id: 9,
    airline: "Cathay Pacific",
    class: "Business",
    departureTime: "15:00",
    arrivalTime: "19:00",
    departureAirport: "Soekarno Hatta - Terminal 2",
    arrivalAirport: "Hong Kong International Airport",
    duration: "7 jam (Direct)",
    price: 25000000,
    baggage: "40 kg",
    cabinBaggage: "15 kg",
    entertainment: "In-Flight Entertainment, Wifi",
    date: "2023-03-04",
  },
  {
    id: 10,
    airline: "Sriwijaya Air",
    class: "Economy",
    departureTime: "16:00",
    arrivalTime: "20:00",
    departureAirport: "Soekarno Hatta - Terminal 1A Domestik",
    arrivalAirport: "Yogyakarta Adisucipto International Airport",
    duration: "1 jam 30 menit (Direct)",
    price: 3500000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "None",
    date: "2023-03-01",
  },
  {
    id: 11,
    airline: "Garuda Indonesia",
    class: "Economy",
    departureTime: "17:00",
    arrivalTime: "21:00",
    departureAirport: "Soekarno Hatta - Terminal 2E",
    arrivalAirport: "Surabaya Juanda International Airport",
    duration: "1 jam 30 menit (Direct)",
    price: 4500000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "None",
    date: "2023-03-02",
  },
  {
    id: 12,
    airline: "Jet Air",
    class: "Business",
    departureTime: "18:00",
    arrivalTime: "22:00",
    departureAirport: "Soekarno Hatta - Terminal 3",
    arrivalAirport: "Singapore Changi Airport",
    duration: "3 jam 30 menit (Direct)",
    price: 8500000,
    baggage: "30 kg",
    cabinBaggage: "10 kg",
    entertainment: "In-Flight Entertainment, Wifi",
    date: "2023-03-03",
  },
  {
    id: 13,
    airline: "Lion Air",
    class: "Economy",
    departureTime: "19:00",
    arrivalTime: "23:00",
    departureAirport: "Soekarno Hatta - Terminal 1A Domestik",
    arrivalAirport: "Makassar Sultan Hasanuddin International Airport",
    duration: "2 jam 30 menit (Direct)",
    price: 4800000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "None",
    date: "2023-03-04",
  },
  {
    id: 14,
    airline: "AirAsia",
    class: "Economy",
    departureTime: "20:00",
    arrivalTime: "00:00",
    departureAirport: "Soekarno Hatta - Terminal 2D",
    arrivalAirport: "Penang International Airport",
    duration: "5 jam (Direct)",
    price: 5500000,
    baggage: "20 kg",
    cabinBaggage: "7 kg",
    entertainment: "None",
    date: "2023-03-05",
  },
  {
    id: 15,
    airline: "Singapore Airlines",
    class: "First Class",
    departureTime: "21:00",
    arrivalTime: "01:00",
    departureAirport: "Soekarno Hatta - Terminal 3",
    arrivalAirport: "Singapore Changi Airport",
    duration: "3 jam 30 menit (Direct)",
    price: 35000000,
    baggage: "50 kg",
    cabinBaggage: "20 kg",
    entertainment: "In-Flight Entertainment, Wifi, Fully Reclining Seat",
    date: "2023-03-06",
  },
];

function ChooseFlight() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const [selectedSort, setSelectedSort] = useState("Harga - Termurah");
  const [sortedFlights, setSortedFlights] = useState(flightData);

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
  } = location.state || {}; // Mendapatkan data dari state

  // Memeriksa apakah ada data yang hilang dan menampilkan pesan jika ada
  if (
    !selectedDepartureCity ||
    !selectedReturnCity ||
    !selectedDepartureDate ||
    !selectedClass ||
    !selectedPassengers ||
    !passengersAmount ||
    (isReturnEnabled && !selectedReturnDate)
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

  console.log("ini selectedDepartureDate: ", selectedDepartureDate);
  const [selectedDay, setSelectedDay] = useState(selectedDepartureDate);

  const dataToSend = {
    selectedDepartureCity,
    selectedReturnCity,
    selectedDepartureDate,
    selectedReturnDate,
    selectedClass,
    selectedPassengers,
    customFunction,
    passengersAmount,
    isReturnEnabled,
  };

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
    enabled: !!selectedDepartureCity && !!selectedReturnCity, // Pastikan ada parameter yang diperlukan sebelum menjalankan query
  });

  const { mutate: chooseCheckouts } = useMutation({
    mutationFn: (body) => {
      console.log("Login mutation called with body:", body); // Debugging log
      return chooseCheckout(body); // Fungsi untuk melakukan request
    },
    onSuccess: (data) => {
      if (data) {
        console.log("Data on success:", data); // Pastikan data sudah ada sebelum navigasi
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
        }); // Kirim flightList dan data
      } else {
        console.error("Token or user not found in response");
      }
    },
    onError: (err) => {
      console.error("error:", err.message);
      toast.error(err?.message);
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

  // if (isLoading) {
  //   return <p>Loading flights...</p>;
  // }

  const handleSortChange = (criteria) => {
    setSelectedSort(criteria);

    const sorted = [...filteredFlights]; // Salin array sebelum sorting
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

    const selectedPassengersJson = JSON.stringify(selectedPassengers);

    const body = {
      passengers: selectedPassengersJson, // Menggunakan selectedPassengers dalam format JSON
      userId: 1,
      pp: isReturnEnabled,
      flightIds: JSON.stringify({
        // Mengonversi flightIds menjadi JSON string
        departure: flightId, // Menggunakan flightId yang dipilih untuk departure

        return: 0,

      }),
    };

    console.log(body);
    console.log(JSON.parse(body.flightIds)); // Menampilkan flightIds sebagai objek untuk pengecekan

    // Mengirim data ke API
    chooseCheckouts(body);

  };

  const chooseReturn = async (event, flightId) => {
    event.preventDefault();

    navigate({
      to: "/choose-return",
      state: {
        flightId,
        selectedDepartureCity,
        selectedReturnCity,
        selectedDepartureDate,
        selectedReturnDate,
        selectedClass,
        selectedPassengers,
        isReturnEnabled,
        passengersAmount,
      },
    });

  };

  const chooseReturns = async (event, flightId) => {
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

  const formatDate = (date) => {
    return format(new Date(date), "d MMMM yyyy", { locale: id });
  };

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

        {/* Main Content */}
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

                            onClick={(event) => {
                              if (isReturnEnabled) {
                                chooseReturns(event, flight.id); // Panggil chooseReturn jika isReturnEnabled true
                              } else {
                                onSubmit(event, flight.id); // Panggil onSubmit jika isReturnEnabled false
                              }
                            }}

                            variant="primary"
                          >
                            Pilih
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
