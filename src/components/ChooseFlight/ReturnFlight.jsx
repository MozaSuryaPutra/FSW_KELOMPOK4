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

function ReturnFlight() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
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
    selectedDay,
    selectedReturnDate,
    selectedClass,
    selectedPassengers,
    customFunction,
    passengersAmount,
    isReturnEnabled,
    flightId,
  } = location.state || {};

  // Mendapatkan data dari state
  const [selectedDays, setSelectedDay] = useState(selectedReturnDate);
  const dataToSend = {
    selectedDepartureCity,
    selectedReturnCity,
    selectedDay,
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
    isError,
    error,
  } = useQuery({
    queryKey: [
      "flight",
      selectedDepartureCity,
      selectedReturnCity,
      selectedDay,
      selectedDays,
      passengersAmount,
      selectedClass,
    ],
    queryFn: () =>
      getSearchedFlight(
        selectedDepartureCity,
        selectedReturnCity,
        selectedDay,
        selectedDays,
        passengersAmount, // Menggunakan modifiedPassengers yang sudah diproses
        selectedClass
      ),
    enabled: !!selectedDepartureCity && !!selectedReturnCity, // Pastikan ada parameter yang diperlukan sebelum menjalankan query
  });

  const { mutate: chooseCheckouts } = useMutation({
    mutationFn: (body) => {
      return chooseCheckout(body); // Fungsi untuk melakukan request
    },
    onSuccess: (data) => {
      setIsSubmitting(true); // Atur state menjadi true
      if (data) {
        toast.success("Berhasil Membuat Checkout Biodata");
        localStorage.removeItem("flightSearch"); // Menghapus item
        setIsSubmitting(true); // Atur state menjadi true
        navigate({
          to: "/checkout-biodata",
          state: {
            data,
            selectedDepartureCity,
            selectedReturnCity,
            selectedDay,
            selectedDays,
            selectedClass,
            selectedPassengers,
          },
        }); // Kirim flightList dan data
      } else {
        console.error("Token or user not found in response");
      }
    },
    onError: (err) => {
      toast.error(err?.message);
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
    const filtered = flightList.returnFlights?.filter((flight) => {
      const formattedDepartureDate = flight.departureDate.substring(0, 10);
      return formattedDepartureDate === selectedDays;
    });
    setFilteredFlights(filtered);
  }, [flightList, selectedDays]);

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
  const onSubmit = async (event, flightIds) => {
    event.preventDefault();
    if (isSubmitting) return; // Cegah klik berulang
    setIsSubmitting(true); // Atur state menjadi true
    const selectedPassengersJson = JSON.stringify(selectedPassengers);

    const body = {
      passengers: selectedPassengersJson, // Menggunakan selectedPassengers dalam format JSON
      userId: userIds,
      pp: isReturnEnabled,
      flightIds: JSON.stringify({
        // Mengonversi flightIds menjadi JSON string
        departure: flightId, // Menggunakan flightId yang dipilih untuk departure
        return: flightIds,
      }),
    };

    // Menampilkan flightIds sebagai objek untuk pengecekan

    // Mengirim data ke API
    chooseCheckouts(body);
  };

  //   const chooseReturn = async (event, flightId) => {
  //     event.preventDefault();

  //     navigate({
  //       to: "/checkout-biodata",
  //       state: {
  //         flightId,
  //       },
  //     });
  //   };

  if (
    !selectedDepartureCity ||
    !selectedReturnCity ||
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
  //Filter flights based on the selected date
  // const filteredFlights = sortedFlights.filter(
  //   (flight) => flight.date === selectedDay
  // );

  return (
    <>
      <style>{`
  @media (max-width: 768px) {
  .custom-col {
    flex-direction: row !important; /* Menonaktifkan flex-column */
    justify-content : space-between;
  }
}
   @media (max-width: 990px) {
  .custom-div {
    width: 100%;
    text-align: center;
  }
}
  
`}</style>
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
              Penerbangan Anda
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
        {selectedReturnDate ? (
          <Row className="mb-4">
            <Col
              md={12}
              className="text-center d-flex justify-content-center flex-wrap gap-1"
            >
              {[...Array(8)].map((_, idx) => {
                const date = addDays(new Date(selectedReturnDate), idx);
                const formattedDate = format(date, "yyyy-MM-dd");
                const dayName = format(date, "EEEE", { locale: id });

                return (
                  <Button
                    key={idx}
                    variant={
                      selectedDays === formattedDate
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
            ) : isError ? (
              <div className="text-center mt-4">
                <Image src="ticket_habis.png" alt="Ticket Habis"></Image>
                <p className="mb-0">Maaf ticket terjual habis</p>
                <p
                  style={{
                    color: "#7126B5",
                  }}
                >
                  Coba cari perjalanan lainnya!
                </p>
              </div>
            ) : filteredFlights?.length > 0 ? (
              filteredFlights.map((flight, idx) => {
                // Menghitung durasi penerbangan
                const departureTime = new Date(flight.departureTime);
                let arrivalTime = new Date(flight.arrivalTime);
                if (arrivalTime < departureTime) {
                  // Menambahkan 24 jam (dalam milidetik) pada waktu kedatangan
                  arrivalTime = new Date(
                    arrivalTime.getTime() + 24 * 60 * 60 * 1000
                  );
                }
                const durationInMillis = arrivalTime - departureTime;

                // Mengonversi durasi dalam milidetik ke format jam dan menit
                const durationHours = Math.floor(
                  durationInMillis / (1000 * 60 * 60)
                );
                const durationMinutes = Math.floor(
                  (durationInMillis % (1000 * 60 * 60)) / (1000 * 60)
                );

                return (
                  <>
                    <h3>Two Way Flight</h3>
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
                                          {flight.departureTime
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
                                          {durationHours}h {durationMinutes}m
                                        </div>
                                        <div
                                          style={{
                                            fontWeight: "bold",
                                            margin: 0,
                                          }}
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
                                          {flight.arrivalTime
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
                              <strong>
                                Rp{" "}
                                {Number(flight.price).toLocaleString("id-ID")}
                              </strong>
                              <Button
                                disabled={isSubmitting}
                                onClick={(event) => onSubmit(event, flight.id)}
                                variant={isSubmitting ? "secondary" : "primary"}
                              >
                                {isSubmitting ? "Memproses..." : "Pilih"}
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
                                  {flight.departureTime
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
                                    <li>
                                      Baggage {flight.airplane.baggage} kg
                                    </li>
                                    <li>
                                      Cabin baggage{" "}
                                      {flight.airplane.cabinBaggage} kg
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
                                  {flight.arrivalTime
                                    .toString()
                                    .substring(11, 16)}
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
                            <p>
                              {flight.arrivalDate.toString().substring(0, 10)}
                            </p>
                            <p>{flight.destinationAirport.name}</p>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </>
                );
              })
            ) : (
              <div className="text-center mt-4">
                <strong>Data pesawat kosong</strong>
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
                { label: "Harga - Termurah", value: "Harga - Termurah" },
                { label: "Durasi - Terpendek", value: "Durasi - Terpendek" },
                {
                  label: "Keberangkatan - Paling Awal",
                  value: "Keberangkatan - Paling Awal",
                },
                {
                  label: "Keberangkatan - Paling Akhir",
                  value: "Keberangkatan - Paling Akhir",
                },
                {
                  label: "Kedatangan - Paling Awal",
                  value: "Kedatangan - Paling Awal",
                },
                {
                  label: "Kedatangan - Paling Akhir",
                  value: "Kedatangan - Paling Akhir",
                },
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

export default ReturnFlight;
