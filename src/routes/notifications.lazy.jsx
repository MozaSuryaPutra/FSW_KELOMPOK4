import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft, FaFilter, FaSearch, FaBell, FaCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useMediaQuery } from "react-responsive";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns"; // Import date-fns
import { id } from "date-fns/locale"; // Lokal untuk Bahasa Indonesia
import { getNotificationById, updateNotification } from "../services/notifications";

export const Route = createLazyFileRoute("/notifications")({
  component: NotificationsList,
});

function formatDate(dateString) {
  return format(new Date(dateString), "dd MMMM, HH:mm", { locale: id }); // Format tanggal
}

function NotificationsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });

  const {
    data: notificationsData,
    isLoading: notificationsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notification", userId],
    queryFn: () => getNotificationById(userId),
    enabled: !!token,
  });

  const { mutate: markAsRead } = useMutation({
  mutationFn: (notifId) => updateNotification(notifId),
  onSuccess: (data, variables) => {
    // Update cache dengan data baru dan pastikan urutan tetap terjaga
    queryClient.setQueryData(["notification", userId], (oldData) => {
      // Perbarui data sesuai dengan ID notifikasi yang diubah
      return oldData
        .map((notif) =>
          notif.id === variables
            ? { ...notif, isRead: true } // Update status `isRead` menjadi `true`
            : notif
        )
        .sort((a, b) => {
          if (a.isRead === b.isRead) {
            return new Date(b.createdAt) - new Date(a.createdAt); // Urutkan berdasarkan waktu
          }
          return a.isRead ? -1 : 1; // `false` lebih tinggi daripada `true`
        });
    });
  },
  onError: (err) => {
    console.error("Gagal mengupdate notifikasi:", err);
  },
});


  const handleNotificationClick = (notifId) => {
    markAsRead(notifId);
  };


  // State untuk filter
  const [filterActive, setFilterActive] = useState(false);
  const [filterByRead, setFilterByRead] = useState(null); // null = semua, true = isRead, false = !isRead

  // Data notifikasi yang sudah difilter
// Data notifikasi yang sudah difilter dan diurutkan
const filteredNotifications = (notificationsData || [])
  .sort((a, b) => {
    // Urutkan berdasarkan status terbaca terlebih dahulu (belum terbaca lebih tinggi)
    if (a.isRead === b.isRead) {
      // Jika status terbaca sama, urutkan berdasarkan tanggal pembuatan
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.isRead ? -1 : 1; // `false` lebih tinggi daripada `true`
  })
  .filter((notif) => filterByRead === null || notif.isRead === filterByRead); // Terapkan filter setelah pengurutan


  const handleFilterToggle = () => {
    if (filterByRead === null) {
      setFilterByRead(true); // Aktifkan filter untuk notifikasi "isRead: true"
    } else if (filterByRead === true) {
      setFilterByRead(false); // Filter untuk "isRead: false"
    } else {
      setFilterByRead(null); // Reset filter ke semua
    }
    setFilterActive(!filterActive); // Toggle status aktif filter
  };

  if (notificationsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-5">
        <h5 style={{ color: "#FF5722", fontWeight: "bold" }}>{error.message}</h5>
        <p>Silakan cek kembali nanti.</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col xs={12}>
          <h5 style={{ fontWeight: "bold" }}>Notifikasi</h5>
        </Col>
      </Row>

      {/* Action Bar */}
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
            <FaArrowLeft className="me-2" />
            Beranda
          </Button>
        </Col>
        <Col
          xs={4}
          sm={3}
          md={isTablet ? "2" : "1"}
          className="d-flex justify-content-center ps-0 pe-0"
        >
          <Button
            variant={filterActive ? "primary" : "outline-secondary"}
            className="p-2 ps-3 pe-3"
            style={{
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleFilterToggle}
          >
            <FaFilter className="me-2" />
            {filterByRead === null
              ? "Semua"
              : filterByRead
              ? "Terbaca"
              : "Belum Terbaca"}
          </Button>
        </Col>
        <Col xs={1} md={1} className="d-flex justify-content-center">
          <Button
            className="p-1"
            style={{
              borderRadius: "50%",
              backgroundColor: "#fff",
              border: "none",
            }}
          >
            <FaSearch className="fs-3" style={{ color: "#9b59b6" }} />
          </Button>
        </Col>
      </Row>

      {/* Notifications */}
      {filteredNotifications?.length ? (
        filteredNotifications.map((notif) => (
          <Row
            key={notif.id}
            className="py-3 border-bottom me-5"
            style={{
              backgroundColor: notif.isRead ? "#f8f9fa" : "#ffffff",
            }}
            onClick={() => handleNotificationClick(notif.id)}
          >
            {/* Ikon Lonceng */}
            <Col
              xs={1}
              className="d-flex align-items-start justify-content-center"
            >
              <div
                style={{
                  padding: "4px",
                  backgroundColor: "#7126B5",
                  borderRadius: "50%",
                  opacity: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                }}
              >
                <FaBell
                  className="text-white"
                  style={{
                    fontSize: "15px",
                  }}
                />
              </div>
            </Col>

            {/* Konten Notifikasi */}
            <Col xs={8}>
              <p className="mb-1 text-secondary" style={{ fontSize: "14px" }}>
                {notif.notifType}
              </p>
              <p className="fw-bold fs-6">{notif.title}</p>
              <p className="mb-0 text-secondary" style={{ fontSize: "13px" }}>
                {notif.message}
              </p>
            </Col>

            {/* Tanggal & Status */}
            <Col xs={3} className="text-end">
              <p
                className="mb-1"
                style={{
                  fontSize: "12px",
                  color: notif.isRead ? "#BDBDBD" : "#757575",
                }}
              >
                {formatDate(notif.createdAt)}{" "}
                <FaCircle
                  style={{
                    color: notif.isRead ? "green" : "red",
                    fontSize: "10px",
                    marginLeft: "5px",
                  }}
                />
              </p>
            </Col>
          </Row>
        ))
      ) : (
        <div className="text-center mt-5">
          <h5 style={{ fontWeight: "bold", color: "#9b59b6" }}>
            Tidak ada notifikasi.
          </h5>
        </div>
      )}
    </Container>
  );
}

export default NotificationsList;
