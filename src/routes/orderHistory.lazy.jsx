import { useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { FaArrowLeft, FaFilter, FaSearch } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import OrderItem from "../components/OrderHistory/OrderItem"; // Komponen Riwayat Pesanan
import OrderDetail from "../components/OrderHistory/OrderDetail"; // Komponen Detail Pesanan
import { useMediaQuery } from "react-responsive";
import { Calendar } from "react-multi-date-picker"; // Import from react-multi-date-picker
import { differenceInMinutes } from "date-fns";
import "react-multi-date-picker/styles/colors/purple.css"; // Import styles
import { useQuery } from "@tanstack/react-query";
import NotFoundPict from "../../public/NotFoundHistory.png";
import { getOrderHistoryById } from "../services/OrderHistory";
import { useSelector } from "react-redux";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/orderHistory")({
  component: OrderHistory,
});

function OrderHistory() {
  const navigate = useNavigate();
  const userId = useSelector((state) => {
    const userString = state.auth.user; // Ambil string JSON dari state
    const user = userString ? JSON.parse(userString) : null; // Parse string menjadi objek
    return user?.id; // Kembalikan id jika user ada
  });
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const {
    data: historyData,
    isLoading: historyLoading,
    isError: historyError,
    isSuccess: historySuccess,
    error,
  } = useQuery({
    queryKey: ["history", userId],
    queryFn: () => getOrderHistoryById(userId),
    enabled: !!token,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]); // Store selected dates
  const [history, setHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Inisialisasi dengan null
  const [filteredData, setFilteredData] = useState([]);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
    }

    const filteredSearchData = historyData.filter((item) => {
      const bookingCode = item?.departureFlight?.bookingCode;
      if (!bookingCode) return false;
      return bookingCode.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredData(filteredSearchData);
    setShowSearchModal(false);
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    setShowSearchModal(false);

    const filteredSearchData = historyData.filter((item) => {
      const bookingCode = item?.departureFlight?.bookingCode;
      if (!bookingCode) return false;
      return bookingCode.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredData(filteredSearchData);
  };

  const handleRemoveSearch = (search) => {
    setRecentSearches(recentSearches.filter((item) => item !== search));
  };

  const handleRemoveAllSearch = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua pencarian?")) {
      setRecentSearches([]);
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);

    if (!isTablet) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleCloseModal = () => {
    setShowSearchModal(false);
    setSearchQuery("");
  };

  const handleFilter = () => {
    const filtered = historyData.filter((item) => {
      const itemDate = new Date(item.departureFlight.departure.date);
      const startDate = new Date(selectedDates[0]); // Tanggal awal
      const endDate = new Date(selectedDates[1]); // Tanggal akhir

      // Periksa apakah itemDate berada dalam rentang tanggal yang dipilih
      return itemDate >= startDate && itemDate <= endDate;
    });

    setFilteredData(filtered);
    setShowModal(false);
  };

  function calculateDuration(departureTime, arrivalTime) {
    // Membuat objek Date untuk kedatangan dan keberangkatan
    const departureDate = new Date(departureTime);
    let arrivalDate = new Date(arrivalTime);

    if (arrivalDate < departureDate) {
      // Menambahkan 24 jam ke waktu kedatangan
      arrivalDate = new Date(arrivalDate.getTime() + 24 * 60 * 60 * 1000);
    }

    // Menghitung perbedaan waktu dalam menit
    const minutes = differenceInMinutes(arrivalDate, departureDate);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  if (historySuccess && historyData && !history.length) {
    const durationData = historyData.map((item) => {
      const duration = calculateDuration(
        item.departureFlight.departure.time,
        item.departureFlight.arrival.time
      );
      return {
        ...item,
        duration,
      };
    });

    setHistory(durationData);
    setFilteredData(durationData);

    if (!selectedOrder) {
      setSelectedOrder(durationData[0] || null);
    }
  }

  if (historyLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        ></div>
        <p className="mt-3 fs-5 text-secondary">
          Memuat riwayat Anda, harap tunggu...
        </p>
      </div>
    );
  }

  if (historyError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          color: "#FF8C00",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/839/839794.png"
          alt="No History"
          style={{
            width: "150px",
            marginBottom: "20px",
            animation: "bounce 2s infinite",
          }}
        />
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Oops! Kosong nih... 😅
        </h3>
        <p style={{ fontSize: "16px", margin: "10px 0" }}>
          Sepertinya kamu belum pernah melakukan pemesanan. 🎫
        </p>
        <p style={{ fontSize: "14px", fontStyle: "italic" }}>
          Jangan khawatir, kamu bisa mulai petualangan baru kapan saja! 🚀
        </p>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF8C00",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => navigate({ to: "/" })}
        >
          Coba Lagi atau Mulai Sekarang! 🛫
        </button>
        <style>
          {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
        </style>
      </div>
    );
  }

  return (
    <Container className="mt-3">
      <Container>
        {/* Header */}
        <Row className="align-items-center mb-3">
          <Col xs={12}>
            <h5 style={{ fontWeight: "bold" }}>Riwayat Pemesanan</h5>
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
              onClick={() => setShowModal(true)}
            >
              <FaFilter />
              Filter
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
              onClick={() => setShowSearchModal(true)}
            ></Button>
          </Col>
        </Row>

        {/* Main Content */}
        <Row
          className={
            isMobile
              ? "d-flex justify-content-center"
              : "ms-5 me-5 d-flex justify-content-center"
          }
        >
          {history.length === 0 ? (
            <div className="text-center mt-5">
              <img
                src={NotFoundPict}
                alt="No Orders"
                className="img-fluid mb-3"
              />
              <h5 style={{ color: "#673AB7", fontWeight: "bold" }}>
                Oops! Riwayat pemesanan kosong!
              </h5>
              <p>Anda belum memiliki riwayat pemesanan.</p>
              <Button
                style={{
                  backgroundColor: "#673AB7",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  border: "none",
                }}
              >
                Cari Penerbangan
              </Button>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center mt-5">
              <h5 style={{ color: "#FF5722", fontWeight: "bold" }}>
                Pesanan tidak ditemukan!
              </h5>
              <p>Pesanan dengan kriteria yang Anda cari tidak tersedia.</p>
            </div>
          ) : (
            <>
              <Col xs={12} md={isTablet ? "12" : "7"}>
                <OrderItem
                  data={filteredData}
                  onSelectOrder={handleSelectOrder}
                />
              </Col>
              <Col xs={12} md={isTablet ? "12" : "5"}>
                {selectedOrder ? (
                  <OrderDetail data={[selectedOrder]} />
                ) : (
                  <p className="text-center">
                    Klik pesanan untuk melihat detail.
                  </p>
                )}
              </Col>
            </>
          )}
        </Row>

        {/* Modal untuk memilih tanggal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Pilih Rentang Waktu</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <Calendar
              value={selectedDates}
              onChange={setSelectedDates}
              range
              rangeHover
              color="#9b59b6"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleFilter}>
              Terapkan Filter
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Pencarian */}
        <Modal show={showSearchModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Masukkan Nomor Penerbangan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ position: "relative" }}>
              <Form.Control
                type="text"
                placeholder="Masukkan Nomor Penerbangan"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <HiX
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                  onClick={() => setSearchQuery("")}
                />
              )}
            </div>
            <div className="mt-3">
              <div className=" d-flex justify-content-between">
                <h6 className="mb-4">Pencarian Terkini</h6>
                <p
                  style={{ color: "#FF0000", cursor: "pointer" }}
                  onClick={handleRemoveAllSearch}
                >
                  Hapus
                </p>
              </div>
              <ul className="p-0">
                {recentSearches.map((search, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between align-items-center border-bottom"
                  >
                    <p
                      className="mb-2"
                      style={{ cursor: "pointer", color: "#673AB7" }}
                      onClick={() => handleRecentSearchClick(search)}
                    >
                      {search}
                    </p>
                    <HiX
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveSearch(search)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSearchSubmit}>
              Cari
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default OrderHistory;
