import { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { Card, Badge, Row, Col } from "react-bootstrap";
import Arrow from "../../../public/Arrow.png";
import LocationMark from "../../../public/location-icon.png";
import { useMediaQuery } from "react-responsive";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

const OrderItem = ({ data, onSelectOrder }) => {
  const [displayedData, setDisplayedData] = useState(data);
  const isMiniMobile = useMediaQuery({ query: "(max-width: 508px)" }); // Deteksi tablet

  const groupByMonthYear = (bookings) => {
    return bookings.reduce((acc, booking) => {
      const departureDate = booking.departureFlight.departure?.date;
      if (!departureDate) return acc;

      // Format bulan dan tahun dengan date-fns
      const groupKey = format(new Date(departureDate), "MMMM yyyy", {
        locale: id,
      }); // Contoh hasil: "Desember 2024"

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(booking);

      return acc;
    }, {});
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: id });
  };

  const formatTime = (dateString) => {
    return format(new Date(dateString), "HH:mm");
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "Issued":
        return "bg-success";
      case "Unpaid":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const groupedBookings = groupByMonthYear(displayedData);

  // Menyortir berdasarkan urutan bulan dan tahun
  const sortedGroupedBookings = Object.entries(groupedBookings).sort((a, b) => {
    const dateA = parse(a[0], "MMMM yyyy", new Date(), { locale: id });
    const dateB = parse(b[0], "MMMM yyyy", new Date(), { locale: id });
    return dateA - dateB;
  });

  useEffect(() => {
    // Ubah status untuk setiap booking menjadi kapitalisasi pada huruf pertama
    const updatedData = data.map((booking) => ({
      ...booking,
      departureFlight: {
        ...booking.departureFlight,
        status:
          booking.departureFlight.status.charAt(0).toUpperCase() +
          booking.departureFlight.status.slice(1).toLowerCase(),
      },
    }));

    setDisplayedData(updatedData);
  }, [data]);

  return (
    <div style={{ margin: "0 auto", maxWidth: "100%" }}>
      {sortedGroupedBookings.map(([monthYear, bookings], index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h5 className="text-primary fw-bold mt-3 fs-5">{monthYear}</h5>

          {bookings.map((booking, index) => (
            <Card
              key={index}
              onClick={() => onSelectOrder(booking)}
              className="mb-3"
              style={{
                border: "1px solid #E5E5E5",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                padding: "10px",
                width: "100%",
                fontSize: isMiniMobile ? "11px" : "12px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge
                    className={`${getBadgeClass(booking.departureFlight.status)} fs-6 px-3 py-2 rounded-pill`}
                  >
                    {booking.departureFlight.status}
                  </Badge>

                  {booking.returnFlight && (
                    <Badge className="bg-warning fs-6 px-3 py-2 rounded-pill">
                      PP
                    </Badge>
                  )}
                </div>

                <Row className="align-items-center">
                  <Col xs={1} className="text-center p-1 mb-4">
                    <img
                      src={LocationMark}
                      alt="Location-icons"
                      className="img-fluid w-75"
                    />
                  </Col>
                  <Col xs={isMiniMobile ? 4 : 3}>
                    <div>
                      <p
                        className="fw-bold mb-1"
                        style={{ fontSize: isMiniMobile ? "11px" : "15px" }}
                      >
                        {booking.departureFlight.departure?.city}
                      </p>
                      <p className="mb-1">
                        {formatDate(booking.departureFlight.departure?.date)}
                      </p>
                      <p className="mb-0 ">
                        {formatTime(booking.departureFlight.departure?.time)}
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={isMiniMobile ? 2 : 4}
                    className={isMiniMobile ? "text-center p-0" : "text-center"}
                  >
                    <div>{booking.duration}</div>
                    <img src={Arrow} alt="Arrow" className="img-fluid" />
                  </Col>
                  <Col xs={1} className="text-center p-1 mb-4">
                    <img
                      src={LocationMark}
                      alt="Location-icons"
                      className="img-fluid w-75"
                    />
                  </Col>
                  <Col xs={isMiniMobile ? 4 : 3}>
                    <div>
                      <p
                        className="fw-bold mb-1"
                        style={{ fontSize: isMiniMobile ? "11px" : "15px" }}
                      >
                        {booking.departureFlight.arrival?.city}
                      </p>
                      <p className="mb-1">
                        {formatDate(booking.departureFlight.arrival?.date)}
                      </p>
                      <p className="mb-0">
                        {formatTime(booking.departureFlight.arrival?.time)}
                      </p>
                    </div>
                  </Col>
                </Row>

                {booking.returnFlight && (
                  <>
                    {/* Return Flight (Duplicate Row for Return) */}
                    <Row className="align-items-center mt-3">
                      <Col xs={1} className="text-center p-1 mb-4">
                        <img
                          src={LocationMark}
                          alt="Location-icons"
                          className="img-fluid w-75"
                        />
                      </Col>
                      <Col xs={isMiniMobile ? 4 : 3}>
                        <div>
                          <p
                            className="fw-bold mb-1"
                            style={{ fontSize: isMiniMobile ? "11px" : "15px" }}
                          >
                            {booking.returnFlight.departure?.city}
                          </p>
                          <p className="mb-1">
                            {formatDate(booking.returnFlight.departure?.date)}
                          </p>
                          <p className="mb-0">
                            {formatTime(booking.returnFlight.departure?.time)}
                          </p>
                        </div>
                      </Col>
                      <Col
                        xs={isMiniMobile ? 2 : 4}
                        className={
                          isMiniMobile ? "text-center p-0" : "text-center"
                        }
                      >
                        <div>{booking.duration}</div>
                        <img
                          src={Arrow}
                          alt="Arrow"
                          className="img-fluid"
                          style={{ transform: "rotate(180deg)" }}
                        />
                      </Col>
                      <Col xs={1} className="text-center p-1 mb-4">
                        <img
                          src={LocationMark}
                          alt="Location-icons"
                          className="img-fluid w-75"
                        />
                      </Col>
                      <Col xs={isMiniMobile ? 4 : 3}>
                        <div>
                          <p
                            className="fw-bold mb-1"
                            style={{ fontSize: isMiniMobile ? "11px" : "15px" }}
                          >
                            {booking.returnFlight.arrival?.city}
                          </p>
                          <p className="mb-1">
                            {formatDate(booking.returnFlight.arrival?.date)}
                          </p>
                          <p className="mb-0">
                            {formatTime(booking.returnFlight.arrival?.time)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

                <hr className="my-4" />

                <Row>
                  <Col>
                    <p className="fw-bold mb-1">Booking Code:</p>
                    <p>{booking.departureFlight.bookingCode}</p>
                  </Col>
                  <Col>
                    <p className="fw-bold mb-1 ">Class:</p>
                    <p>{booking.departureFlight.seatClass}</p>
                  </Col>
                  <Col className="text-end ">
                    <h6 className="fw-bold" style={{ color: "#4B1979" }}>
                      Rp{" "}
                      {booking.priceDetails.totalPayAfterTax.toLocaleString(
                        "id-ID"
                      )}
                    </h6>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
};

OrderItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      departureFlight: PropTypes.shape({
        status: PropTypes.string.isRequired,
        bookingCode: PropTypes.string, // Bisa null, jadi tidak pakai isRequired
        airlineName: PropTypes.string.isRequired,
        airplaneCode: PropTypes.string.isRequired,
        seatClass: PropTypes.string.isRequired,
        departure: PropTypes.shape({
          date: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          airport: PropTypes.string.isRequired,
          terminalName: PropTypes.string.isRequired,
        }).isRequired,
        arrival: PropTypes.shape({
          date: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          airport: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      priceDetails: PropTypes.shape({
        passenger: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            flightType: PropTypes.string.isRequired,
          })
        ).isRequired,
        tax: PropTypes.number.isRequired,
        totalPayAfterTax: PropTypes.number.isRequired,
      }).isRequired,

      ordererNames: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          fullname: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onSelectOrder: PropTypes.func.isRequired,
};

export default memo(OrderItem);
