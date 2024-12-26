import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import {
  getFavDestination,
  getContinents,
} from "../../services/homepage/homepage";
import PassengersPopup from "../PassengersPopup/PassengeresPopup"; // Import the PassengersPopup component
import { chooseCheckout } from "../../services/checkout/checkout";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const FavoriteDestination = () => {
  const navigate = useNavigate();
  const userIds = useSelector((state) => {
    const userString = state.auth.user; // Ambil string JSON dari state
    const user = userString ? JSON.parse(userString) : null; // Parse string menjadi objek
    return user?.id; // Kembalikan id jika user ada
  });

  const [selectedContinent, setSelectedContinent] = useState([0]); // Default: Semua
  const [modalShow, setModalShow] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showPassengerModal, setShowPassengerModal] = useState(false); // State for showing passengers modal
  const [passengerDetails, setPassengerDetails] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk melacak proses

  const formatDate = (dateString) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: id });
  };

  const formatTime = (dateString) => {
    return format(new Date(dateString), "HH:mm");
  };

  // Fetch continents data
  const { data: continentData, isLoading: isLoadingContinents } = useQuery({
    queryKey: ["continentData"],
    queryFn: () => getContinents(),
  });

  // Fetch favorite destinations based on selected continent
  const { data: favDestinationData, isLoading: isLoadingDestinations } =
    useQuery({
      queryKey: ["favDestination", selectedContinent],
      queryFn: () => getFavDestination(selectedContinent),
      enabled: selectedContinent !== null,
    });

  const { mutate: chooseCheckouts } = useMutation({
    mutationFn: (body) => chooseCheckout(body),
    onSuccess: (data) => {
      if (data) {
        toast.success("Berhasil Membuat Checkout Biodata");
        localStorage.removeItem("flightSearch"); // Menghapus item
        setIsSubmitting(true); // Atur state menjadi true
        navigate({
          to: "/checkout-biodata",
          state: {
            data,
            selectedDepartureCity: favDestinationData.departureCityId,
            selectedReturnCity: favDestinationData.destinationCityId,
            selectedDay: favDestinationData.departureDate,
            selectedReturnDate: favDestinationData.arrivalDate,
            selectedClass: favDestinationData.seatClass,
            selectedPassengers: passengerDetails,
          },
        });
      } else {
        console.error("Token or user not found in response");
      }
    },
    onError: (err) => {
      if (err.message == "jwt malformed") {
        toast.error(
          "Upss!! Kamu belum melakukan login, Silahlan Login terlebih dahulu"
        );
      } else {
        toast.error(err.message);
      }
      setIsSubmitting(false); // Atur state menjadi true
    },
  });

  const handleCardClick = (destination) => {
    setSelectedDestination(destination);
    setModalShow(true);
  };

  // Function to show passenger modal
  const handlePassengerClick = () => {
    setShowPassengerModal(true);
  };

  // Function to update passenger details
  const handleSelectCounts = (counts) => {
    setPassengerDetails(counts); // Update passenger details with selected counts
  };

  // Function to close passenger modal
  const handlePassengerModalClose = () => {
    setShowPassengerModal(false);
  };

  const onSubmit = async (event, flightId) => {
    event.preventDefault();
    if (isSubmitting) return; // Cegah klik berulang
    setIsSubmitting(true); // Atur state menjadi true
    const body = {
      passengers: JSON.stringify(passengerDetails),
      userId: userIds,
      pp: false,
      flightIds: JSON.stringify({
        departure: flightId,
        return: 0,
      }),
    };

    chooseCheckouts(body);
  };

  // Check if booking button should be disabled
  const isBookingDisabled =
    passengerDetails.adults === 0 &&
    passengerDetails.children === 0 &&
    passengerDetails.infants === 0;

  return (
    <Container className="py-5">
      <h3 className="mb-4">Destinasi Favorit</h3>
      {/* Filter by continent */}
      <Row className="d-flex">
        <Col xs="auto" className="mb-3">
          <Button
            variant="light"
            className="text-dark"
            onClick={() => setSelectedContinent([0])}
            style={{
              backgroundColor:
                selectedContinent === 0 ? "#A084CA" : "rgba(226, 212, 240, 1)",
              color: selectedContinent === 0 ? "#fff" : "#000",
            }}
          >
            <img src="fi_search.png" alt="" /> Semua
          </Button>
        </Col>
        {isLoadingContinents ? (
          <p>Loading continents...</p>
        ) : (
          continentData?.map((continent) => (
            <Col xs="auto" className="mb-3" key={continent.id}>
              <Button
                variant="light"
                className="text-dark"
                onClick={() => setSelectedContinent(continent.id)}
                style={{
                  backgroundColor:
                    selectedContinent === continent.id
                      ? "#A084CA"
                      : "rgba(226, 212, 240, 1)",
                  color: selectedContinent === continent.id ? "#fff" : "#000",
                }}
              >
                <img src="fi_search.png" alt="" /> {continent.name}
              </Button>
            </Col>
          ))
        )}
      </Row>

      {/* Favorite destinations */}
      <Row>
        {isLoadingDestinations ? (
          <p>Loading destinations...</p>
        ) : favDestinationData?.length > 0 ? (
          favDestinationData.map((destination, index) => (
            <Col
              lg={3}
              md={4}
              sm={6}
              xs={12}
              key={index}
              className="mb-4 d-flex justify-content-between"
            >
              <Card
                style={{
                  width: "18rem",
                  margin: "0 auto",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => handleCardClick(destination)}
              >
                <Card.Img
                  variant="top"
                  src={
                    {
                      1: "/Jakarta1.jpg",
                      6: "/Bandung6.jpg",
                      5: "/Sydney5.jpg",
                      2: "/Newyork2.jpg",
                      7: "/Samarinda7.jpg",
                      3: "/Berlin3.jpg",
                      4: "/Rio4.jpg",
                    }[destination.destinationCityId] || "/defaultImage.jpg"
                  }
                  alt={destination.destinationCity}
                  style={{
                    height: "150px",
                    objectFit: "cover",
                    borderBottom: "2px solid #A084CA",
                  }}
                  className="p-2"
                />

                <Card.Body
                  style={{ backgroundColor: "#f8f9fa", padding: "16px 20px" }}
                >
                  <Card.Title
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#343a40",
                      marginBottom: "10px",
                    }}
                  >
                    {destination.departureCity}{" "}
                    <span style={{ color: "#A084CA" }}>→</span>{" "}
                    {destination.destinationCity}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "0.9rem",
                      color: "#6c757d",
                      marginBottom: "8px",
                    }}
                  >
                    {formatDate(destination.departureDate)}
                  </Card.Text>
                  <Card.Text
                    style={{
                      fontSize: "1rem",
                      color: "#495057",
                      fontWeight: "500",
                      marginBottom: "8px",
                    }}
                  >
                    {formatTime(destination.departureTime)} -{" "}
                    {formatTime(destination.arrivalTime)}
                  </Card.Text>
                  <Card.Text
                    style={{
                      fontSize: "0.9rem",
                      color: "#6c757d",
                      marginBottom: "8px",
                    }}
                  >
                    {destination.airline} - {destination.seatClass}
                  </Card.Text>
                  <Card.Text
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#343a40",
                    }}
                  >
                    Mulai dari{" "}
                    <span style={{ color: "#A084CA" }}>
                      Rp {Number(destination.price).toLocaleString("id-ID")}
                    </span>
                  </Card.Text>
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

      {/* Modal for destination details */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        size="lg"
      >
        {selectedDestination && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {`${selectedDestination.departureCity} (${selectedDestination.departureAirportName}) -> ${selectedDestination.destinationCity} (${selectedDestination.destinationAirportName})`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} className="mb-3">
                  <img
                    src={
                      {
                        1: "/Jakarta1.jpg",
                        6: "/Bandung6.jpg",
                        5: "/Sydney5.jpg",
                        2: "/Newyork2.jpg",
                        7: "/Samarinda7.jpg",
                        3: "/Berlin3.jpg",
                        4: "/Rio4.jpg",
                      }[selectedDestination.destinationCityId] ||
                      "/defaultImage.jpg"
                    }
                    alt={selectedDestination.destinationAirportName}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs={2}>
                  <img
                    src={selectedDestination.logo}
                    alt={selectedDestination.airline}
                    style={{ height: "40px" }}
                  />
                </Col>
                <Col>
                  <p className="mb-0">
                    <strong>
                      {selectedDestination.airline} -{" "}
                      {selectedDestination.seatClass}
                    </strong>
                  </p>
                  <p className="mb-0">{selectedDestination.airplaneCode}</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <h4>Informasi Penerbangan</h4>
                  <ul>
                    <li>
                      <strong>Keberangkatan:</strong>{" "}
                      {formatDate(selectedDestination.departureDate)} (
                      {formatTime(selectedDestination.departureTime)})
                    </li>
                    <li>
                      <strong>Kedatangan:</strong>{" "}
                      {formatDate(selectedDestination.arrivalDate)} (
                      {formatTime(selectedDestination.arrivalTime)})
                    </li>
                    <li>
                      <strong>Baggage:</strong> {selectedDestination.baggage} kg
                    </li>
                    <li>
                      <strong>Cabin Baggage:</strong>{" "}
                      {selectedDestination.cabinBaggage} kg
                    </li>
                    {/* Adding Total Seat information if available */}
                    <li>
                      <strong>Total Seat:</strong>{" "}
                      {selectedDestination.totalSeat || "Tidak ada informasi"}
                    </li>
                  </ul>
                  <Card.Text
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      color: "#343a40",
                    }}
                  >
                    Price{": "}
                    <span style={{ color: "#A084CA" }}>
                      Rp{" "}
                      {Number(selectedDestination.price).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </Card.Text>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="outline-primary" onClick={handlePassengerClick}>
                Penumpang
              </Button>
              <Button
                variant="primary"
                onClick={(event) => {
                  onSubmit(event, selectedDestination.flightId); // Panggil onSubmit jika isReturnEnabled false
                }}
                disabled={isBookingDisabled}
              >
                Booking
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* PassengersPopup Modal */}
      <PassengersPopup
        show={showPassengerModal}
        handleClose={handlePassengerModalClose}
        onSelectCounts={handleSelectCounts} // Pass the function to update passenger details
      />
    </Container>
  );
};

export default FavoriteDestination;
