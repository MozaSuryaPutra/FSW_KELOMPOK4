import { useEffect } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { FaArrowLeft, FaFilter, FaSearch } from "react-icons/fa";
import OrderItem from "../components/OrderHistory/OrderItem"; // Komponen Riwayat Pesanan
import OrderDetail from "../components/OrderHistory/OrderDetail"; // Komponen Detail Pesanan
import { useMediaQuery } from "react-responsive";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // CSS utama
import "react-date-range/dist/theme/default.css"; // Tema default
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
//import NotFoundPict from "../assets/NotFoundHistory.png";

export const Route = createLazyFileRoute("/orderHistory")({
  component: OrderHistory,
});

let data = [
  {
    id: 1,
    status: "Issued",
    bookingCode: "6723y2GHK",
    duration: "4h 0m",
    class: "Economy",
    departure: {
      city: "Jakarta",
      date: "5 Maret 2023",
      time: "19:10",
    },
    departureAirport: "Soekarno Hatta - Terminal 1A Domestik",
    airline: "Jet Air - Economy",
    flightCode: "JT - 203",
    passengers: [
      { name: "Mr. Harry Potter", id: "1234567" },
      { name: "Miss Hermione", id: "789658" },
    ],
    arrival: {
      city: "Melbourne",
      date: "5 Maret 2023",
      time: "23:10",
    },
    arrivalAirport: "Melbourne International Airport",
    pricing: {
      adults: "IDR 9,550,000",
      baby: "IDR 0",
      tax: "IDR 300,000",
      total: "IDR 9,850,000",
    },
  },
  {
    id: 1,
    status: "Issued",
    bookingCode: "6723y2GHK",
    duration: "4h 0m",
    class: "Economy",
    departure: {
      city: "Jakarta",
      date: "5 Maret 2023",
      time: "19:10",
    },
    departureAirport: "Soekarno Hatta - Terminal 1A Domestik",
    airline: "Jet Air - Economy",
    flightCode: "JT - 203",
    passengers: [
      { name: "Mr. Harry Potter", id: "1234567" },
      { name: "Miss Hermione", id: "789658" },
    ],
    arrival: {
      city: "Melbourne",
      date: "5 Maret 2023",
      time: "23:10",
    },
    arrivalAirport: "Melbourne International Airport",
    pricing: {
      adults: "IDR 9,550,000",
      baby: "IDR 0",
      tax: "IDR 300,000",
      total: "IDR 9,850,000",
    },
  },
  {
    id: 2,
    status: "Unpaid",
    bookingCode: "46TY834LJ",
    duration: "7h 30m",
    class: "Business",
    departure: {
      city: "Bali",
      date: "12 April 2023",
      time: "14:00",
    },
    departureAirport: "Ngurah Rai International Airport",
    airline: "Garuda Indonesia - Business",
    flightCode: "GA - 520",
    passengers: [{ name: "Mr. John Doe", id: "987654" }],
    arrival: {
      city: "Singapore",
      date: "12 April 2023",
      time: "17:30",
    },
    arrivalAirport: "Changi Airport",
    pricing: {
      adults: "IDR 4,000,000",
      baby: "IDR 0",
      tax: "IDR 150,000",
      total: "IDR 4,150,000",
    },
  },
  {
    id: 3,
    status: "Cancelled",
    bookingCode: "88JKH23FD",
    duration: "1h 20m",
    class: "First Class",
    departure: {
      city: "Yogyakarta",
      date: "10 Mei 2023",
      time: "09:30",
    },
    departureAirport: "Adisutjipto International Airport",
    airline: "Lion Air - First Class",
    flightCode: "LA - 301",
    passengers: [{ name: "Mrs. Jane Smith", id: "11223344" }],
    arrival: {
      city: "Jakarta",
      date: "10 Mei 2023",
      time: "10:50",
    },
    arrivalAirport: "Soekarno Hatta - Terminal 2",
    pricing: {
      adults: "IDR 2,500,000",
      baby: "IDR 0",
      tax: "IDR 100,000",
      total: "IDR 2,600,000",
    },
  },
  {
    id: 4,
    status: "Issued",
    bookingCode: "JFK8329OP",
    duration: "5h 45m",
    class: "Economy",
    departure: {
      city: "Surabaya",
      date: "20 Juni 2023",
      time: "08:15",
    },
    departureAirport: "Juanda International Airport",
    airline: "Air Asia - Economy",
    flightCode: "AA - 123",
    passengers: [
      { name: "Mr. Luke Skywalker", id: "135790" },
      { name: "Miss Leia Organa", id: "246810" },
    ],
    arrival: {
      city: "Bangkok",
      date: "20 Juni 2023",
      time: "14:00",
    },
    arrivalAirport: "Suvarnabhumi Airport",
    pricing: {
      adults: "IDR 3,800,000",
      baby: "IDR 0",
      tax: "IDR 200,000",
      total: "IDR 4,000,000",
    },
  },
  {
    id: 5,
    status: "Unpaid",
    bookingCode: "NB1245ZX",
    duration: "2h 15m",
    class: "Economy",
    departure: {
      city: "Medan",
      date: "1 Juli 2023",
      time: "06:00",
    },
    departureAirport: "Kualanamu International Airport",
    airline: "Sriwijaya Air - Economy",
    flightCode: "SJ - 789",
    passengers: [
      { name: "Mr. Tony Stark", id: "101112" },
      { name: "Miss Pepper Potts", id: "131415" },
    ],
    arrival: {
      city: "Jakarta",
      date: "1 Juli 2023",
      time: "08:15",
    },
    arrivalAirport: "Soekarno Hatta - Terminal 1C",
    pricing: {
      adults: "IDR 1,500,000",
      baby: "IDR 0",
      tax: "IDR 50,000",
      total: "IDR 1,550,000",
    },
  },
];

// data =[];

function OrderHistory() {
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Deteksi tablet

  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(data[0] || null); // Default ke item pertama atau null jika data kosong

  const [filteredData, setFilteredData] = useState(data); // State untuk data yang difilter
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order); // Perbarui state dengan order yang dipilih
  };

  // Fungsi untuk memfilter data berdasarkan rentang tanggal
  const handleFilter = () => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;

    const filtered = data.filter((item) => {
      const itemDate = new Date(item.departure.date);
      return itemDate >= start && itemDate <= end;
    });

    setFilteredData(filtered); // Update state dengan data yang telah difilter
    setShowModal(false); // Tutup modal setelah filter diterapkan
  };

  return (
    <Container className="mt-3">
      <Container className="">
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
              onClick={() => setShowModal(true)} // Menampilkan modal filter
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

        {/* Main Content */}
        <Row
          className={
            isMobile
              ? "d-flex justify-content-center"
              : "ms-5 me-5 d-flex justify-content-center"
          }
        >
          {filteredData.length === 0 ? (
            // Jika data kosong
            <div className="text-center mt-5">
              <img
                src="NotFoundHistory.png"
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
          ) : (
            <>
              {/* Order Items */}
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
          <Modal.Body>
            <DateRangePicker
              ranges={dateRange}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              rangeColors={["#9b59b6"]} // Warna highlight
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleFilter}>
              Terapkan Filter
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
}

export default OrderHistory;
