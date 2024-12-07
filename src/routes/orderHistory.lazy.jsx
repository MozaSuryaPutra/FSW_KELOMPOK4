import { useEffect, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { FaArrowLeft, FaFilter, FaSearch } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import OrderItem from "../components/OrderHistory/OrderItem"; // Komponen Riwayat Pesanan
import OrderDetail from "../components/OrderHistory/OrderDetail"; // Komponen Detail Pesanan
import { useMediaQuery } from "react-responsive";
import { DateRangePicker } from "react-date-range";
import { addDays, differenceInMinutes } from "date-fns";
import "react-date-range/dist/styles.css"; // CSS utama
import "react-date-range/dist/theme/default.css"; // Tema default
import { useQuery } from '@tanstack/react-query'
import NotFoundPict from "../../public/NotFoundHistory.png";
import { getOrderHistoryById } from "../services/OrderHistory";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/orderHistory")({
  component: OrderHistory,
});

let historyData = [
  {
    transactionId: 1,
    status: "Issued",
    bookingCode: "YXZ76382",
    seatClass: "Economy",
    flight: {
      departure: {
        city: "Medan",
        date: "2024-11-15T14:30:00.000Z",
        time: "2024-11-15T14:30:00.000Z",
        airport: "Kualanamu International Airport - Terminal 1",
      },
      arrival: {
        city: "Kuala Lumpur",
        date: "2024-11-15T18:15:00.000Z",
        time: "2024-11-15T18:15:00.000Z",
        airport: "KLIA International Airport",
      },
    },
    airline: "AirAsia - Economy",
    flightCode: "AK - 123",
    passengers: [{ name: "Ms. Dora Aulia", id: "7895423" }],
    pricing: {
      adults: "IDR 1,200,000",
      baby: "IDR 0",
      tax: "IDR 100,000",
      total: "IDR 1,300,000",
    },
  },
  {
    transactionId: 2,
    status: "Unpaid",
    bookingCode: "KLP85329",
    seatClass: "Business",
    flight: {
      departure: {
        city: "Denpasar",
        date: "2024-12-21T06:45:00.000Z",
        time: "2024-12-21T06:45:00.000Z",
        airport: "Ngurah Rai International Airport - Terminal 2",
      },
      arrival: {
        city: "Seoul",
        date: "2024-12-21T14:45:00.000Z",
        time: "2024-12-21T14:45:00.000Z",
        airport: "Incheon International Airport",
      },
    },
    airline: "Korean Air - Business",
    flightCode: "KE - 456",
    passengers: [{ name: "Mr. John Doe", id: "1478523" }],
    pricing: {
      adults: "IDR 8,500,000",
      baby: "IDR 0",
      tax: "IDR 500,000",
      total: "IDR 9,000,000",
    },
  },
  {
    transactionId: 3,
    status: "Issued",
    bookingCode: "LOP52934",
    seatClass: "First Class",
    flight: {
      departure: {
        city: "Surabaya",
        date: "2024-10-05T20:00:00.000Z",
        time: "2024-10-05T20:00:00.000Z",
        airport: "Juanda International Airport",
      },
      arrival: {
        city: "Hong Kong",
        date: "2024-10-06T01:30:00.000Z",
        time: "2024-10-06T01:30:00.000Z",
        airport: "Hong Kong International Airport",
      },
    },
    airline: "Cathay Pacific - First Class",
    flightCode: "CX - 789",
    passengers: [{ name: "Mr. Steve Lee", id: "6543217" }],
    pricing: {
      adults: "IDR 15,000,000",
      baby: "IDR 0",
      tax: "IDR 1,200,000",
      total: "IDR 16,200,000",
    },
  },
  {
    transactionId: 4,
    status: "Unpaid",
    bookingCode: "MBT73952",
    seatClass: "Economy",
    flight: {
      departure: {
        city: "Bandung",
        date: "2024-09-18T08:00:00.000Z",
        time: "2024-09-18T08:00:00.000Z",
        airport: "Husein Sastranegara Airport",
      },
      arrival: {
        city: "Amsterdam",
        date: "2024-09-18T20:10:00.000Z",
        time: "2024-09-18T20:10:00.000Z",
        airport: "Schiphol International Airport",
      },
    },
    airline: "KLM Airlines - Economy",
    flightCode: "KL - 234",
    passengers: [{ name: "Ms. Angela Parker", id: "8527413" }],
    pricing: {
      adults: "IDR 11,200,000",
      baby: "IDR 0",
      tax: "IDR 700,000",
      total: "IDR 11,900,000",
    },
  },
  {
    transactionId: 5,
    status: "Issued",
    bookingCode: "GTR85472",
    seatClass: "Economy",
    flight: {
      departure: {
        city: "Makassar",
        date: "2024-08-12T02:15:00.000Z",
        time: "2024-08-12T02:15:00.000Z",
        airport: "Sultan Hasanuddin International Airport",
      },
      arrival: {
        city: "Tokyo",
        date: "2024-08-12T10:00:00.000Z",
        time: "2024-08-12T10:00:00.000Z",
        airport: "Narita International Airport",
      },
    },
    airline: "Japan Airlines - Economy",
    flightCode: "JL - 512",
    passengers: [{ name: "Mr. Peter Quill", id: "9632147" }],
    pricing: {
      adults: "IDR 13,000,000",
      baby: "IDR 0",
      tax: "IDR 600,000",
      total: "IDR 13,600,000",
    },
  },
];

// data = [];

function OrderHistory() {
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // let {
  //   data: historyData,
  //   isSuccess: historySuccess,
  //   isPending: historyPending,
  // } = useQuery({
  //   queryKey: ['history'],
  //   queryFn: () => getOrderHistoryById(),
  // })

  // useEffect(() => {
  //   if (historySuccess) setHistory(historyData)
  //   },[historyData,historySuccess]);

  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [history,setHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(historyData[0] || null);
  const [filteredData, setFilteredData] = useState(historyData);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "1234ABC",
    "7UY71912",
  ]);

    // Fetch data using react-query


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
    }

    const filteredSearchData = historyData.filter((item) =>
      item.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredData(filteredSearchData);
    setShowSearchModal(false);
  };

  const handleRemoveSearch = (search) => {
    setRecentSearches(recentSearches.filter((item) => item !== search));
  };

  const handleRemoveAllSearch = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua pencarian?")) {
      setRecentSearches([]);
    }
  };
  

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setShowSearchModal(false);
    setSearchQuery("");
  };

  const handleFilter = () => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;

    const filtered = historyData.filter((item) => {
      const itemDate = new Date(item.flight.departure.date);
      return itemDate >= start && itemDate <= end;
    });

    setFilteredData(filtered);
    setShowModal(false);
  };

  function calculateDuration(departureTime, arrivalTime) {
    const minutes = differenceInMinutes(
      new Date(arrivalTime),
      new Date(departureTime)
    );
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  historyData = historyData.map((item) => {
    const duration = calculateDuration(
      item.flight.departure.time,
      item.flight.arrival.time
    );
    return {
      ...item,
      duration,
    };
  });

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
          <Col xs={4} sm={3} md={isTablet ? "2" : "1"} className=" d-flex justify-content-center ps-0 pe-0">
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
            >
              <FaSearch className="fs-3" style={{ color: "#9b59b6" }} />
            </Button>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className={isMobile ? "d-flex justify-content-center" : "ms-5 me-5 d-flex justify-content-center"}>
        {historyData.length === 0 ? (
  // Kasus 1: Tidak ada data sama sekali
  <div className="text-center mt-5">
    <img src={NotFoundPict} alt="No Orders" className="img-fluid mb-3" />
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
  // Kasus 2: Data ada, tetapi hasil filter kosong
  <div className="text-center mt-5">
    <h5 style={{ color: "#FF5722", fontWeight: "bold" }}>
      Pesanan tidak ditemukan!
    </h5>
    <p>Pesanan dengan kriteria yang Anda cari tidak tersedia.</p>
  </div>
) : (
  // Kasus 3: Data hasil filter ditemukan
  <>
    <Col xs={12} md={isTablet ? "12" : "7"}>
      <OrderItem data={filteredData} onSelectOrder={handleSelectOrder} />
    </Col>
    <Col xs={12} md={isTablet ? "12" : "5"}>
      {selectedOrder ? (
        <OrderDetail data={[selectedOrder]} />
      ) : (
        <p className="text-center">Klik pesanan untuk melihat detail.</p>
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
              rangeColors={["#9b59b6"]}
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
            <Form.Control
              type="text"
              placeholder="Masukkan Nomor Penerbangan"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="mt-3">
              <div className=" d-flex justify-content-between">
              <h6 className="mb-4">Pencarian Terkini</h6>
              <p
      style={{ color:"#FF0000",cursor: "pointer" }}
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
                    <p className="mb-2">{search}</p>
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
