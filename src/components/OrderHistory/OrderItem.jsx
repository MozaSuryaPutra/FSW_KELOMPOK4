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
      const departureDate = booking.flight.departure?.date;
      if (!departureDate) return acc;

      // Format bulan dan tahun dengan date-fns
      const groupKey = format(new Date(departureDate), "MMMM yyyy", { locale: id }); // Contoh hasil: "Desember 2024"

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(booking);

      return acc;
    }, {});
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: id });
  };

  const formatTime = (dateString) => {
    return format(new Date(dateString), "HH:mm"); // Contoh hasil: "06:00"
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
  const sortedGroupedBookings = Object.entries(groupedBookings)
    .sort((a, b) => {
      const dateA = parse(a[0], "MMMM yyyy", new Date(), { locale: id });
      const dateB = parse(b[0], "MMMM yyyy", new Date(), { locale: id });
      return dateA - dateB;
    });

  useEffect(() => {
    setDisplayedData(data);
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
                    className={`${getBadgeClass(booking.status)} fs-6 px-3 py-2 rounded-pill`}
                  >
                    {booking.status}
                  </Badge>
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
                        {booking.flight.departure?.city}
                      </p>
                      <p className="mb-1">{formatDate(booking.flight.departure?.date)}</p>
                      <p className="mb-0 ">{formatTime(booking.flight.departure?.time)}</p>
                    </div>
                  </Col>
                  <Col xs={isMiniMobile ? 2 : 4} className={isMiniMobile ? "text-center p-0" : "text-center"}>
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
                        {booking.flight.arrival?.city}
                      </p>
                      <p className="mb-1">{formatDate(booking.flight.arrival?.date)}</p>
                      <p className="mb-0">{formatTime(booking.flight.arrival?.time)}</p>
                    </div>
                  </Col>
                </Row>

                <hr className="my-4" />

                <Row>
                  <Col>
                    <p className="fw-bold mb-1">Booking Code:</p>
                    <p>{booking.bookingCode}</p>
                  </Col>
                  <Col>
                    <p className="fw-bold mb-1 ">Class:</p>
                    <p>{booking.seatClass}</p>
                  </Col>
                  <Col className="text-end">
                    <h6 className="text-primary fw-bold">
                      {booking.pricing.total}
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
      status: PropTypes.string.isRequired,
      flight: PropTypes.shape({
        departure: PropTypes.shape({
          city: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
        }).isRequired,
        arrival: PropTypes.shape({
          city: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired, 
      duration: PropTypes.string.isRequired,
      bookingCode: PropTypes.string.isRequired,
      seatClass: PropTypes.string.isRequired,
      pricing: PropTypes.shape({
        total: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onSelectOrder: PropTypes.func.isRequired,
};

export default memo(OrderItem);
