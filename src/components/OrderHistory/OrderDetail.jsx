import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
//import logoIcon from "../../assets/info-icon.png";

const OrderDetail = ({ data }) => {
  return (
    <div>
      {data.map((order) => (
        <Card key={order.id} style={{ marginLeft: "10px" }}>
          <Card.Body>
            <Row className="mb-2">
              <Col>
                <h5>Detail Pesanan</h5>
              </Col>
              <Col className="text-end">
                <span
                  style={{
                    backgroundColor:
                      order.status === "Issued"
                        ? "#73CA5C"
                        : order.status === "Unpaid"
                          ? "#FF0000"
                          : "#8A8A8As",
                    color: "white",
                    padding: "4px 12px",
                    fontSize: "14px",
                    borderRadius: "16px",
                    display: "inline-block", // Jika perlu
                  }}
                >
                  {order.status}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Booking Code:{" "}
                  <span className="text-primary">{order.bookingCode}</span>
                </p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <div className="mb-0 d-flex justify-content-between">
                  <strong className="mb-0">{order.departure.time}</strong>
                  <p className="mb-0" style={{ color: "#A06ECE" }}>
                    Keberangkatan
                  </p>
                </div>
                <p className="mb-0">{order.departure.date}</p>
                <p>{order.departureAirport}</p>
              </Col>
            </Row>
            <hr />
            <Row className="mb-2">
              <Col xs={1} md={1} className="p-0 align-content-center">
                <img
                  src="info-icon.png"
                  alt="logo Info"
                  className=" img-fluid w-100 align-content-center"
                />
              </Col>
              <Col>
                <p>
                  <strong>{order.airline}</strong> <br />
                  <strong>{order.flightCode}</strong>
                </p>

                <p className="m-0">
                  <strong>Informasi:</strong>
                </p>
                {order.passengers.map((passenger, index) => (
                  <p key={index} className="m-0">
                    Penumpang {index + 1}:{" "}
                    <span className="text-primary">{passenger.name}</span>
                    <br />
                    ID: {passenger.id}
                  </p>
                ))}
              </Col>
            </Row>
            <hr />
            <Row className="mb-2">
              <Col>
                <div className="mb-0 d-flex justify-content-between">
                  <strong className="mb-0">{order.arrival.time}</strong>
                  <p className="mb-0" style={{ color: "#A06ECE" }}>
                    Kedatangan
                  </p>
                </div>
                <p className="mb-0">{order.arrival.date}</p>
                <p>{order.arrivalAirport}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p>
                  <strong>Rincian Harga</strong>
                </p>
                <div className="d-flex justify-content-between mb-0">
                  <p>2 Adults </p>
                  <p>{order.pricing.adults}</p>
                </div>
                <div className="d-flex justify-content-between mb-0">
                  <p>1 baby </p>
                  <p>{order.pricing.baby}</p>
                </div>
                <div className="d-flex justify-content-between mb-0">
                  <p>Tax </p>
                  <p>{order.pricing.tax}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-0">
                  <strong>Total</strong>
                  <strong style={{ color: "#9b59b6", fontSize: "20px" }}>
                    {order.pricing.total}
                  </strong>
                </div>
                <p></p>
              </Col>
            </Row>
            <Button
              style={{
                padding: "16px 12px",
                backgroundColor:
                  order.status === "Issued"
                    ? "#7126B5"
                    : order.status === "Unpaid"
                      ? "#FF0000"
                      : "#95a5a6",
                borderColor:
                  order.status === "Issued"
                    ? "#9b59b6"
                    : order.status === "Unpaid"
                      ? "#e74c3c"
                      : "#95a5a6",
                color: "white",
              }}
              className="w-100"
              disabled={order.status === "Canceled"}
            >
              {order.status === "Issued"
                ? "Cetak Tiket"
                : order.status === "Unpaid"
                  ? "Lanjut Bayar"
                  : "Canceled"}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

OrderDetail.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      bookingCode: PropTypes.string.isRequired,
      departure: PropTypes.shape({
        time: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
      departureAirport: PropTypes.string.isRequired,
      airline: PropTypes.string.isRequired,
      flightCode: PropTypes.string.isRequired,
      passengers: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
      arrival: PropTypes.shape({
        time: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }).isRequired,
      arrivalAirport: PropTypes.string.isRequired,
      pricing: PropTypes.shape({
        adults: PropTypes.string.isRequired,
        baby: PropTypes.string.isRequired,
        tax: PropTypes.string.isRequired,
        total: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default OrderDetail;
