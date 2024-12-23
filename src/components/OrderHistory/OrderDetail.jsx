import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getTicket } from "../../services/ticket";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { formatInTimeZone } from "date-fns-tz";
const OrderDetail = ({ data }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(data); // Menyimpan data dalam state
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setOrders(data); // Mengupdate state ketika props data berubah
  }, [data]);


  const formatDate = (dateString) => {
    return formatInTimeZone(dateString, 'UTC', 'd MMMM yyyy');
  };
  

  const formatTime = (dateString) => {
    return formatInTimeZone(dateString, 'UTC', 'HH:mm'); // Mengonversi dan memformat waktu ke UTC
  };

  // Fungsi untuk memperbarui status pesanan
  const updateOrderStatus = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              departureFlight: {
                ...order.departureFlight,
                status: status, // Mengubah status pesanan
              },
            }
          : order
      )
    );
  };

  return (
    <div>
      {orders.map((order) => (
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
                      order.departureFlight.status === "Issued"
                        ? "#73CA5C"
                        : order.departureFlight.status === "Unpaid"
                          ? "#FF0000"
                          : "#8A8A8A",
                    color: "white",
                    padding: "4px 12px",
                    fontSize: "14px",
                    borderRadius: "16px",
                    display: "inline-block",
                  }}
                >
                  {order.departureFlight.status}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  Booking Code:{" "}
                  <span className="text-primary">
                    {order.departureFlight.bookingCode}
                  </span>
                </p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <div className="mb-0 d-flex justify-content-between">
                  <strong className="mb-0">
                    {formatTime(order.departureFlight.departure.time)}
                  </strong>
                  <p className="mb-0" style={{ color: "#A06ECE" }}>
                    Keberangkatan
                  </p>
                </div>
                <p className="mb-0">
                  {formatDate(order.departureFlight.departure.date)}
                </p>
                <p>
                  {order.departureFlight.departure.airport}
                  {order.departureFlight.departure.terminalName && (
                    <> - {order.departureFlight.departure.terminalName}</>
                  )}{" "}
                </p>
                {order.returnFlight && (
                  <>
                    <div className="mb-0 d-flex justify-content-between">
                      <strong className="mb-0">
                        {formatTime(order.returnFlight.departure.time)}
                      </strong>
                      <p className="mb-0" style={{ color: "#A06ECE" }}>
                        Keberangkatan
                      </p>
                    </div>
                    <p className="mb-0">
                      {formatDate(order.returnFlight.departure.date)}
                    </p>
                    <p>
                      {order.returnFlight.departure.airport}
                      {order.returnFlight.departure.terminalName && (
                        <> - {order.returnFlight.departure.terminalName}</>
                      )}{" "}
                    </p>
                  </>
                )}
              </Col>
            </Row>
            <hr />
            <Row className="mb-2">
              <Col xs={1} md={1} className="p-0 align-content-center">
                <img
                  src={order.departureFlight.logo}
                  alt="logo Info"
                  className=" img-fluid w-100 align-content-center"
                />
                {order.returnFlight && (
                  <img
                    src={order.returnFlight.logo}
                    alt="logo Info"
                    className=" img-fluid w-100 align-content-center"
                  />
                )}
              </Col>
              <Col>
                {order.returnFlight ? (
                  <Row>
                    <Col className="p-0">
                      <p>
                        <strong>
                          {order.departureFlight.airlineName} -{" "}
                          {order.departureFlight.seatClass}
                        </strong>{" "}
                        <br />
                        <strong>{order.departureFlight.airplaneCode}</strong>
                      </p>
                    </Col>
                    <Col>
                      <strong>
                        {order.returnFlight.airlineName} -{" "}
                        {order.returnFlight.seatClass}
                      </strong>{" "}
                      <br />
                      <strong>{order.returnFlight.airplaneCode}</strong>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <p>
                      <strong>
                        {order.departureFlight.airlineName} -{" "}
                        {order.departureFlight.seatClass}
                      </strong>{" "}
                      <br />
                      <strong>{order.departureFlight.airplaneCode}</strong>
                    </p>
                  </Row>
                )}

                <p className="m-0">
                  <strong>Informasi:</strong>
                </p>
                {order.ordererNames.map((passenger, index) => (
                  <p key={index} className="m-0">
                    Penumpang {index + 1}:{" "}
                    <span className="text-primary">{passenger.fullname}</span>
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
                  <strong className="mb-0">
                    {formatTime(order.departureFlight.arrival.time)}
                  </strong>
                  <p className="mb-0" style={{ color: "#A06ECE" }}>
                    Kedatangan
                  </p>
                </div>
                <p className="mb-0">
                  {formatDate(order.departureFlight.arrival.date)}
                </p>
                <p>
                  {order.departureFlight.arrival.airport}{" "}
                  {order.departureFlight.arrival.terminalName && (
                    <> - {order.departureFlight.arrival.terminalName}</>
                  )}{" "}
                </p>
                {order.returnFlight && (
                  <>
                    <div className="mb-0 d-flex justify-content-between">
                      <strong className="mb-0">
                        {formatTime(order.returnFlight.arrival.time)}
                      </strong>
                      <p className="mb-0" style={{ color: "#A06ECE" }}>
                        Kedatangan
                      </p>
                    </div>
                    <p className="mb-0">
                      {formatDate(order.returnFlight.arrival.date)}
                    </p>
                    <p>
                      {order.returnFlight.arrival.airport}
                      {order.returnFlight.arrival.terminalName && (
                        <> - {order.returnFlight.arrival.terminalName}</>
                      )}{" "}
                    </p>
                  </>
                )}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p>
                  <strong>Rincian Harga</strong>
                </p>
                <div>
                  {/* Bagian Departure Flight */}
                  <h6>Departure Flight</h6>
                  <div className="d-flex justify-content-between">
                    <p className="m-0">
                      {order.priceDetails.passenger
                        .filter(
                          (passenger) =>
                            (passenger.type === "adult" &&
                              passenger.flightType === "departure") ||
                            null
                        )
                        .reduce(
                          (total, passenger) => total + passenger.count,
                          0
                        )}{" "}
                      Adults
                    </p>
                    <p className="m-0">
                      Rp{" "}
                      {order.priceDetails.passenger
                        .filter(
                          (passenger) =>
                            passenger.type === "adult" &&
                            passenger.flightType === "departure"
                        )
                        .reduce(
                          (total, passenger) => total + passenger.total,
                          0
                        )
                        .toLocaleString()}
                    </p>
                  </div>

                  {order.priceDetails.passenger
                    .filter(
                      (passenger) =>
                        passenger.type === "child" &&
                        passenger.flightType === "departure"
                    )
                    .reduce((total, passenger) => total + passenger.count, 0) >
                    0 && (
                    <div className="d-flex justify-content-between">
                      <p className="m-0">
                        {order.priceDetails.passenger
                          .filter(
                            (passenger) =>
                              passenger.type === "child" &&
                              passenger.flightType === "departure"
                          )
                          .reduce(
                            (total, passenger) => total + passenger.count,
                            0
                          )}{" "}
                        Children
                      </p>
                      <p className="m-0">
                        Rp{" "}
                        {order.priceDetails.passenger
                          .filter(
                            (passenger) =>
                              passenger.type === "child" &&
                              passenger.flightType === "departure"
                          )
                          .reduce(
                            (total, passenger) => total + passenger.total,
                            0
                          )
                          .toLocaleString()}
                      </p>
                    </div>
                  )}

                  {order.priceDetails.passenger
                    .filter(
                      (passenger) =>
                        passenger.type === "baby" &&
                        passenger.flightType === "departure"
                    )
                    .reduce((total, passenger) => total + passenger.count, 0) >
                    0 && (
                    <div className="d-flex justify-content-between">
                      <p className="m-0">
                        {order.priceDetails.passenger
                          .filter(
                            (passenger) =>
                              passenger.type === "baby" &&
                              passenger.flightType === "departure"
                          )
                          .reduce(
                            (total, passenger) => total + passenger.count,
                            0
                          )}{" "}
                        Babies
                      </p>
                      <p className="m-0">
                        Rp{" "}
                        {order.priceDetails.passenger
                          .filter(
                            (passenger) =>
                              passenger.type === "baby" &&
                              passenger.flightType === "departure"
                          )
                          .reduce(
                            (total, passenger) => total + passenger.total,
                            0
                          )
                          .toLocaleString()}
                      </p>
                    </div>
                  )}
                  <hr />

                  {/* Bagian Return Flight */}
                  {order.returnFlight && (
                    <>
                      <h6>Return Flight</h6>
                      <div className="d-flex justify-content-between">
                        <p className="m-0">
                          {order.priceDetails.passenger
                            .filter(
                              (passenger) =>
                                passenger.type === "adult" &&
                                passenger.flightType === "return"
                            )
                            .reduce(
                              (total, passenger) => total + passenger.count,
                              0
                            )}{" "}
                          Adults
                        </p>
                        <p className="m-0">
                          Rp{" "}
                          {order.priceDetails.passenger
                            .filter(
                              (passenger) =>
                                passenger.type === "adult" &&
                                passenger.flightType === "return"
                            )
                            .reduce(
                              (total, passenger) => total + passenger.total,
                              0
                            )
                            .toLocaleString()}
                        </p>
                      </div>

                      {order.priceDetails.passenger
                        .filter(
                          (passenger) =>
                            passenger.type === "baby" &&
                            passenger.flightType === "return"
                        )
                        .reduce(
                          (total, passenger) => total + passenger.count,
                          0
                        ) > 0 && (
                        <div className="d-flex justify-content-between">
                          <p className="m-0">
                            {order.priceDetails.passenger
                              .filter(
                                (passenger) =>
                                  passenger.type === "baby" &&
                                  passenger.flightType === "return"
                              )
                              .reduce(
                                (total, passenger) => total + passenger.count,
                                0
                              )}{" "}
                            Babies
                          </p>
                          <p className="m-0">
                            Rp{" "}
                            {order.priceDetails.passenger
                              .filter(
                                (passenger) =>
                                  passenger.type === "baby" &&
                                  passenger.flightType === "return"
                              )
                              .reduce(
                                (total, passenger) => total + passenger.total,
                                0
                              )
                              .toLocaleString()}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Bagian Pajak dan Total */}
                  <div className="d-flex justify-content-between">
                    <p className="m-0">Tax</p>
                    <p className="m-0">
                      Rp {order.priceDetails.tax.toLocaleString()}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>Total</strong>
                    <strong style={{ color: "#9b59b6", fontSize: "20px" }}>
                      Rp {order.priceDetails.totalPayAfterTax.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </Col>
            </Row>
            <Button
              style={{
                padding: "16px 12px",
                backgroundColor:
                  order.departureFlight.status === "Issued"
                    ? "#7126B5"
                    : order.departureFlight.status === "Unpaid"
                      ? "#FF0000"
                      : "#95a5a6",
                borderColor:
                  order.departureFlight.status === "Issued"
                    ? "#9b59b6"
                    : order.departureFlight.status === "Unpaid"
                      ? "#e74c3c"
                      : "#95a5a6",
                color: "white",
              }}
              className="w-100"
              disabled={order.departureFlight.status === "Canceled" || loading} // Tombol disable jika canceled atau loading
              onClick={async () => {
                if (order.departureFlight.status === "Issued") {
                  setLoading(true); // Set loading true saat proses dimulai
                  try {
                    const file = await getTicket(order.transactionId); // Mendapatkan file PDF
                    if (file) {
                      toast.success("Berhasil cetak tiket!");
                      // Menangani pengunduhan atau menampilkan file PDF
                      const link = document.createElement("a");
                      link.href = URL.createObjectURL(file);
                      link.download = `ticket-${order.transactionId}.pdf`;
                      link.click();
                    } else {
                      toast.error("Tiket tidak ditemukan.");
                    }
                  } catch (err) {
                    toast.error("Terjadi kesalahan saat mengambil data tiket.");
                  } finally {
                    setLoading(false); // Set loading false setelah proses selesai
                  }
                } else if (order.departureFlight.status === "Unpaid") {
                  // Logika untuk melanjutkan ke checkout
                  navigate({
                    to: "/checkout-success",
                    replace: false,
                    state: {
                      transactionId: order.transactionId, // Kirim transactionId untuk proses pembayaran
                    },
                  });
                }
              }}
            >
              {loading ? (
                <ReactLoading type="spin" color="#fff" height={24} width={24} /> // Spinner loading
              ) : order.departureFlight.status === "Issued" ? (
                "Cetak Tiket"
              ) : order.departureFlight.status === "Unpaid" ? (
                "Lanjut Bayar"
              ) : (
                "Canceled"
              )}
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
      departureFlight: PropTypes.shape({
        status: PropTypes.string.isRequired,
        bookingCode: PropTypes.string,
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
};

export default OrderDetail;
