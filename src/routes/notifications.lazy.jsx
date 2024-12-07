import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, ListGroup, Badge, Button, Col, Row } from "react-bootstrap";
import { FaArrowLeft, FaFilter, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMediaQuery } from "react-responsive";

export const Route = createLazyFileRoute("/notifications")({
  component: NotificationsList,
});

const notifications = [
  {
    id: 1,
    type: "Promosi",
    message: "Dapatkan Potongan 50% Tiket! Syarat dan Ketentuan berlaku!",
    date: "20 Maret",
    time: "14:04",
    status: "read",
  },
  {
    id: 2,
    type: "Notifikasi",
    message:
      "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!",
    date: "5 Maret",
    time: "14:04",
    status: "unread",
  },
];

function NotificationsList() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  return (
    <Container className="mt-4">
      <Container className="">
        {/* Header */}
        <Row className="align-items-center mb-3">
          <Col xs={12}>
            <h5 style={{ fontWeight: "bold" }}>Notifikasi</h5>
          </Col>
        </Row>

        <Row className="align-items-center mb-3">
          <Col xs={7} sm={8} md={isTablet ? "9" : "10"} className="text-start">
            <Button
              style={{
                backgroundColor: "#9b59b6",
                color: "#fff",
                borderRadius: "10px",
                border: "none",
                width: "100%",
                textAlign: "left",
              }}
            >
              <div className="text-left">
                <FaArrowLeft className="me-2" />
                Beranda
              </div>
            </Button>
          </Col>
          <Col
            xs={4}
            sm={3}
            md={isTablet ? "2" : "1"}
            className=" d-flex justify-content-center ps-0 pe-0"
          >
            <Button
              variant="outline-secondary"
              className="p-2 ps-3 pe-3"
              style={{
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaFilter />
              Filter
            </Button>
          </Col>
          <Col xs={1} md={1} className=" d-flex justify-content-center">
            <Button
              className="p-1"
              style={{
                borderRadius: "50%",
                backgroundColor: "#fff",
                border: "none",
              }}
            >
              <FaSearch className=" fs-3" style={{ color: "#9b59b6" }} />
            </Button>
          </Col>
        </Row>
        {/* Notifications */}
        <h5 style={{ fontWeight: "bold", color: "#9b59b6" }}>Notifikasi</h5>
        <ListGroup>
          {notifications.map((notif) => (
            <ListGroup.Item
              key={notif.id}
              className="d-flex justify-content-between align-items-start"
            >
              <div>
                <h6 style={{ fontWeight: "bold", color: "#9b59b6" }}>
                  {notif.type}
                </h6>
                <p style={{ margin: 0 }}>{notif.message}</p>
              </div>
              <div className="text-end">
                <p style={{ margin: 0, fontSize: "0.9rem" }}>
                  {notif.date}, {notif.time}
                </p>
                <Badge
                  pill
                  bg={notif.status === "unread" ? "danger" : "success"}
                  style={{ marginTop: "5px" }}
                >
                  {notif.status === "unread" ? "•" : "•"}
                </Badge>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </Container>
  );
}

export default NotificationsList;
