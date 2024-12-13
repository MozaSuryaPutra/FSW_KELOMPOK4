import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import FlightDetail from "../components/payment/flightDetail";
import BreadCrumb from "../components/payment/breadCrumbs";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCheckoutByID } from "../services/checkout/checkout";
import { updatePassanger } from "../services/checkout/checkout";
import { useState } from "react";
import "../components/payment/payment.css";
import "../components/payment/paymentPemesanan.css";
import "../components/payment/paymentPassenger.css";

export const Route = createLazyFileRoute("/checkout-biodata")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [flightPassenger, setFlightPassenger] = useState([]);
  const [hasLastName, setHasLastName] = useState(true);
  const [passengershasLastName, setpassengersHasLastName] = useState(true);
  const [ordererFullName, setOrdererFullName] = useState("");
  const [ordererFamilyName, setOrdererFamilyName] = useState("");
  const [ordererNumberPhone, setOrdererNumberPhone] = useState("");
  const [ordererEmail, setOrdererEmail] = useState("");
  const [ordererBookingCode, setOrdererBookingCode] = useState(null);
  const [passengersTitle, setPassengersTitle] = useState("mr");
  const [passengersType, setPassengersType] = useState("");
  const [passengersFullName, setPassengersFullName] = useState("");
  const [passengersFamilyName, setPassengersFamilyName] = useState("");
  const [passengersBirthDate, setPassengersBirthDate] = useState("");
  const [passengersCitizenship, setPassengersCitizenship] = useState("");
  const [passengersIdentityNumber, setPassengersIdentityNumber] = useState("");
  const [passengersPublisherCountry, setPassengersPublisherCountry] =
    useState("");
  const [passengersExpiredAt, setPassengersExpiredAt] = useState("");
  const [userId, setUserId] = useState(0);
  const [transactionId, setTransactionId] = useState(0);
  const dataKursi = [];

  const {
    data,
    selectedDepartureCity,
    selectedReturnCity,
    selectedDepartureDate,
    selectedReturnDate,
    selectedClass,
    selectedPassengers,
  } = location.state || {}; // Menggunakan default object jika state tidak ada

  const {
    data: details,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detail", data.transaction.userId, data.transaction.id],
    queryFn: () =>
      getCheckoutByID(data.transaction.userId, data.transaction.id),
    enabled: !!token,
  });

  const { mutate: update, isPending: isUpdateProcessing } = useMutation({
    mutationFn: (request) => updatePassanger(request),
    onSuccess: () => {
      navigate({ to: `/checkout-success` });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setUserId(details?.transaction.userId);
      setTransactionId(details?.transaction.id);
    }

    if (!token) {
      navigate({ to: "/" });
    }
    if (isSuccess && details) {
      setFlightPassenger(details);
    } else if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [details, isSuccess, error, token, navigate]);

  if (isLoading) {
    return <p>Loading flights...</p>;
  }

  console.log("data total penumpang : ", details.transaction.expiredFilling);
  const onSubmit = async (event) => {
    event.preventDefault();

    const temp = [];

    for (
      let index = 0;
      index < details.priceDetails.passenger.length;
      index++
    ) {
      temp.push({
        title: passengersTitle,
        passengerType: details.priceDetails.passenger[index].type,
        fullname: passengersFullName,
        familyName: passengersFamilyName,
        birthDate: passengersBirthDate,
        citizenship: passengersCitizenship,
        identityNumber: passengersIdentityNumber,
        publisherCountry: passengersPublisherCountry,
        expiredAt: passengersExpiredAt,
      });
    }

    const orderer = {
      fullname: ordererFullName,
      familyName: ordererFamilyName,
      numberPhone: ordererNumberPhone,
      email: ordererEmail,
    };

    console.log("test:", orderer);

    const request = {
      userId,
      transactionId,
      orderer: JSON.stringify(orderer),
      passengers: JSON.stringify(temp),
      seatIds: JSON.stringify(dataKursi),
    };
    update(request);
  };

  //set Kursi Penumpang
  const generateSeats = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (
      <Button
        key={start + index}
        className="button-seat text-center"
        style={{ margin: "2px", width: "30px", paddingRight: "20px" }}
        onClick={() => {
          dataKursi.push(start + index);
          console.log(dataKursi);
        }}

        // onClick={() => console.log(`Seat ID: `)}
      >
        X
      </Button>
    ));
  };
  const generateRows = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (
      <Button
        key={start + index}
        className="button-seat text-center"
        style={{
          margin: "2px",
          width: "55px",
          paddingRight: "15px",
          background: " transparent",
          color: "black",
          border: "0px none transparent",
          fontWeight: "500",
          pointerEvents: "none",
        }}
      >
        {index + 1}
      </Button>
    ));
  };

  const totalSeats = details.flights.departure.airplane.seat.length;
  const LeftRightSeats = totalSeats / 2;
  const resultRows = Math.ceil(totalSeats / 6);

  // Membuat tombol untuk kursi kiri dan kanan
  const seatsLeft = generateSeats(1, LeftRightSeats);
  const seatsRight = generateSeats(LeftRightSeats + 1, totalSeats);
  const totalRows = generateRows(1, resultRows);
  // ------------------

  const Countdown = ({ expiredFilling }) => {
    // 1. Menghitung selisih waktu pada saat komponen pertama kali dimuat
    const calculateTimeLeft = () => {
      const nowLocal = new Date(); // Waktu lokal saat ini
      const expiredFillingDate = new Date(expiredFilling); // Waktu expiredFilling dalam format UTC/ISO
      const expiredFillingLocal = new Date(
        expiredFillingDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      ); // Waktu expiredFilling diubah ke waktu lokal (misal: Jakarta)

      const timeDifference = expiredFillingLocal.getTime() - nowLocal.getTime(); // Selisih dalam milidetik

      if (timeDifference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

      // Menghitung jam, menit, dan detik
      const hours = Math.floor(timeDifference / (1000 * 60 * 60)); // Jam
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      ); // Menit
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000); // Detik

      return { hours, minutes, seconds };
    };

    // 2. Menyimpan waktu dalam state
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    // 3. Menyimpan state modal (apakah modal ditampilkan atau tidak)
    const [showModal, setShowModal] = useState(false);

    // 4. Mengupdate waktu setiap detik
    useEffect(() => {
      const timer = setInterval(() => {
        const time = calculateTimeLeft();
        setTimeLeft(time);

        // Cek apakah waktu sudah habis
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
          setShowModal(true); // Menampilkan modal saat waktu habis
          clearInterval(timer); // Hentikan timer setelah waktu habis
        }
      }, 1000);

      // Bersihkan interval saat komponen di-unmount
      return () => clearInterval(timer);
    }, []);

    // Modal komponen
    const Modal = () => (
      <div style={modalWrapperStyle}>
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <p>Waktu Sesi Anda Telah Berakhir</p>
            <button
              className="bg-danger"
              onClick={() => (window.location.href = "/")}
            >
              Kembali ke halaman sebelumnya
            </button>
          </div>
        </div>
      </div>
    );

    // Styling untuk wrapper yang menghalangi interaksi dengan elemen di belakang modal
    const modalWrapperStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Menambahkan latar belakang gelap
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000, // Pastikan modal muncul di atas elemen lain
      pointerEvents: "all", // Membuat wrapper ini bisa menerima interaksi
    };

    // Styling untuk modal
    const modalStyle = {
      backgroundColor: "#FF0000",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      zIndex: 1010, // Pastikan konten modal tetap di atas wrapper
      pointerEvents: "auto", // Pastikan tombol di dalam modal bisa diklik
    };

    const modalContentStyle = {
      color: "#fff", // Ubah warna teks agar lebih kontras di atas latar belakang merah
    };

    return (
      <div>
        Selesaikan dalam{" "}
        {`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
        {showModal && <Modal />}
      </div>
    );
  };

  console.log("ini luaran details : ", details.priceDetails.passenger);
  // -------------------------------------------------------------------------
  return (
    <div className="row g-3 m-0">
      <div
        className="border-bottom border-dark p-2 mb-2 border-opacity-10"
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="fs-5 text-dark ">
          <BreadCrumb />
        </div>
        <div className="text-center">
          <div className="container">
            <div className="p-3 text-white fw-bolder fs-6 bg-danger border border-danger-subtle rounded-3">
              <Countdown expiredFilling={details.transaction.expiredFilling} />
            </div>
          </div>
        </div>
      </div>
      <div className="container content-container">
        <div className="d-flex justify-content-center gap-5">
          <div className="">
            <form onSubmit={onSubmit}>
              <div className="">
                <div className="container">
                  <Card
                    className=""
                    style={{
                      padding: "15px",
                      border: "1px #3C3C3C solid",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Card.Title
                      style={{ marginBottom: "30px", fontWeight: "700" }}
                    >
                      Isi Data Pemesanan
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-3 text-white"
                      style={{
                        backgroundColor: "#3C3C3C",
                        borderRadius: "8px 8px 0px 0px",
                        padding: "10px 15px",
                        fontSize: "1rem",
                        fontWeight: "500",
                      }}
                    >
                      Data Diri Pemesan
                    </Card.Subtitle>
                    <Card.Body>
                      <div style={{ marginTop: "-15px" }}>
                        <Form.Group className="mb-3" controlId="fullName">
                          <Form.Label className="custom-label">
                            Nama Lengkap
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nama Lengkap"
                            value={ordererFullName}
                            onChange={(e) => {
                              setOrdererFullName(e.target.value);
                            }}
                            style={{
                              borderRadius: "8px",
                              padding: "10px",
                              border: "1px black solid",
                            }}
                          />
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                          <Form.Label column sm="8" className="custom-label">
                            Punya Nama Keluarga?
                          </Form.Label>
                          <Col
                            sm="4"
                            className="text-end switch d-flex justify-content-end"
                          >
                            <Form.Check
                              type="switch"
                              id="hasLastName"
                              checked={hasLastName}
                              onChange={(e) => setHasLastName(e.target.checked)}
                              className="custom-switch"
                            />
                          </Col>
                        </Form.Group>

                        {hasLastName && (
                          <Form.Group className="mb-3" controlId="familyName">
                            <Form.Label className="custom-label">
                              Nama Keluarga
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nama Belakang"
                              value={ordererFamilyName}
                              onChange={(e) =>
                                setOrdererFamilyName(e.target.value)
                              }
                              style={{
                                borderRadius: "8px",
                                padding: "10px",
                                border: "1px black solid",
                              }}
                            />
                          </Form.Group>
                        )}

                        {/* Nomor Telepon */}
                        <Form.Group className="mb-3" controlId="phoneNumber">
                          <Form.Label className="custom-label">
                            Nomor Telepon
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nomor Telepon"
                            value={ordererNumberPhone}
                            onChange={(e) => {
                              setOrdererNumberPhone(e.target.value);
                            }}
                            style={{
                              borderRadius: "8px",
                              padding: "10px",
                              border: "1px black solid",
                            }}
                          />
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label className="custom-label">
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            value={ordererEmail}
                            onChange={(e) => setOrdererEmail(e.target.value)}
                            style={{
                              borderRadius: "8px",
                              padding: "10px",
                              border: "1px black solid",
                            }}
                          />
                        </Form.Group>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                <div className="container mt-4">
                  <div>
                    {details.priceDetails.passenger.map((passenger, index) => (
                      <React.Fragment key={index}>
                        {passenger.count > 1 ? (
                          // Jika count lebih dari 1, lakukan perulangan sebanyak count
                          Array.from({ length: passenger.count }).map(
                            (_, cardIndex) => (
                              <Card
                                key={`${index}-${cardIndex}`}
                                style={{
                                  padding: "15px",
                                  border: "1px #3C3C3C solid",
                                  borderRadius: "12px",
                                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                <Card.Title
                                  style={{
                                    marginBottom: "30px",
                                    fontWeight: "700",
                                  }}
                                >
                                  Isi Data Penumpang
                                </Card.Title>
                                <Card.Subtitle
                                  className="mb-3 text-white"
                                  style={{
                                    backgroundColor: "#3C3C3C",
                                    borderRadius: "8px 8px 0px 0px",
                                    padding: "10px 15px",
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                  }}
                                >
                                  Data Diri Penumpang {cardIndex + 1} {"-"}{" "}
                                  {passenger.type}
                                </Card.Subtitle>
                                <Card.Body>
                                  <div style={{ marginTop: "-15px" }}>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="title"
                                    >
                                      <Form.Label className="custom-label">
                                        Title
                                      </Form.Label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                          setPassengersTitle(e.target.value);
                                        }}
                                        value={passengersTitle}
                                        style={{
                                          borderRadius: "8px",
                                          padding: "10px",
                                          border: "1px black solid",
                                        }}
                                      >
                                        <option value="Mr">Mr</option>
                                        <option value="Mrs">Mrs</option>
                                      </Form.Select>
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="fullName"
                                    >
                                      <Form.Label className="custom-label">
                                        Nama Lengkap
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Nama Lengkap"
                                        onChange={(e) => {
                                          setPassengersFullName(e.target.value);
                                        }}
                                        value={passengersFullName}
                                        style={{
                                          borderRadius: "8px",
                                          padding: "10px",
                                          border: "1px black solid",
                                        }}
                                      />
                                    </Form.Group>

                                    <Form.Group
                                      as={Row}
                                      className="mb-3"
                                      controlId="familyName"
                                    >
                                      <Form.Label
                                        column
                                        sm="8"
                                        className="custom-label"
                                      >
                                        Punya Nama Keluarga?
                                      </Form.Label>
                                      <Col sm="4" className="text-end">
                                        <Form.Check
                                          type="switch"
                                          id="passengershasLastName"
                                          checked={passengershasLastName}
                                          onChange={(e) =>
                                            setpassengersHasLastName(
                                              e.target.checked
                                            )
                                          }
                                          className="custom-switch"
                                        />
                                      </Col>
                                    </Form.Group>

                                    {passengershasLastName && (
                                      <Form.Group
                                        className="mb-3"
                                        controlId="lastName"
                                      >
                                        <Form.Label className="custom-label">
                                          Nama Keluarga
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
                                          placeholder="Nama Keluarga"
                                          onChange={(e) => {
                                            setPassengersFamilyName(
                                              e.target.value
                                            );
                                          }}
                                          value={passengersFamilyName}
                                          style={{
                                            borderRadius: "8px",
                                            padding: "10px",
                                            border: "1px black solid",
                                          }}
                                        />
                                      </Form.Group>
                                    )}

                                    <Form.Group
                                      className="mb-3"
                                      controlId="bornDate"
                                    >
                                      <Form.Label
                                        column
                                        sm="8"
                                        className="custom-label"
                                      >
                                        Tanggal Lahir
                                      </Form.Label>
                                      <Col
                                        sm="12"
                                        className="text-end custom-width"
                                      >
                                        <Form.Control
                                          type="date"
                                          placeholder="yyyy-mm-dd"
                                          value={passengersBirthDate}
                                          onChange={(e) => {
                                            setPassengersBirthDate(
                                              e.target.value
                                            );
                                          }}
                                          style={{
                                            borderRadius: "8px",
                                            padding: "10px",
                                            border: "1px black solid",
                                          }}
                                        />
                                      </Col>
                                    </Form.Group>

                                    <Form.Group
                                      className="mb-3"
                                      controlId="contry"
                                    >
                                      <Form.Label className="custom-label">
                                        Kewarganegaraan
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Indonesia"
                                        onChange={(e) => {
                                          setPassengersCitizenship(
                                            e.target.value
                                          );
                                        }}
                                        value={passengersCitizenship}
                                        style={{
                                          borderRadius: "8px",
                                          padding: "10px",
                                          border: "1px black solid",
                                        }}
                                      />
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="ktp"
                                    >
                                      <Form.Label className="custom-label">
                                        KTP / Paspor
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                          setPassengersIdentityNumber(
                                            e.target.value
                                          );
                                        }}
                                        value={passengersIdentityNumber}
                                        style={{
                                          borderRadius: "8px",
                                          padding: "10px",
                                          border: "1px black solid",
                                        }}
                                      />
                                    </Form.Group>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="publisherCountry"
                                    >
                                      <Form.Label className="custom-label">
                                        Negara Penerbit
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder=""
                                        onChange={(e) => {
                                          setPassengersPublisherCountry(
                                            e.target.value
                                          );
                                        }}
                                        value={passengersPublisherCountry}
                                        style={{
                                          borderRadius: "8px",
                                          padding: "10px",
                                          border: "1px black solid",
                                        }}
                                      />
                                    </Form.Group>

                                    <Form.Group
                                      className="mb-3"
                                      controlId="endDate"
                                    >
                                      <Form.Label
                                        column
                                        sm="8"
                                        className="custom-label"
                                      >
                                        Berlaku Sampai
                                      </Form.Label>
                                      <Col
                                        sm="12"
                                        className="text-end custom-width"
                                      >
                                        <Form.Control
                                          type="date"
                                          placeholder="yyyy-mm-dd"
                                          value={passengersExpiredAt}
                                          onChange={(e) => {
                                            setPassengersExpiredAt(
                                              e.target.value
                                            );
                                          }}
                                          style={{
                                            borderRadius: "8px",
                                            padding: "10px",
                                            border: "1px black solid",
                                          }}
                                        />
                                      </Col>
                                    </Form.Group>
                                  </div>
                                </Card.Body>
                              </Card>
                            )
                          )
                        ) : (
                          <Card
                            style={{
                              padding: "15px",
                              border: "1px #3C3C3C solid",
                              borderRadius: "12px",
                              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Card.Title
                              style={{
                                marginBottom: "30px",
                                fontWeight: "700",
                              }}
                            >
                              Isi Data Penumpang
                            </Card.Title>
                            <Card.Subtitle
                              className="mb-3 text-white"
                              style={{
                                backgroundColor: "#3C3C3C",
                                borderRadius: "8px 8px 0px 0px",
                                padding: "10px 15px",
                                fontSize: "1rem",
                                fontWeight: "500",
                              }}
                            >
                              Data Diri Penumpang {index + 1} {"-"}{" "}
                              {passenger.type}
                            </Card.Subtitle>
                            <Card.Body>
                              <div style={{ marginTop: "-15px" }}>
                                <Form.Group className="mb-3" controlId="title">
                                  <Form.Label className="custom-label">
                                    Title
                                  </Form.Label>
                                  <Form.Select
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                      setPassengersTitle(e.target.value);
                                    }}
                                    value={passengersTitle}
                                    style={{
                                      borderRadius: "8px",
                                      padding: "10px",
                                      border: "1px black solid",
                                    }}
                                  >
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                  </Form.Select>
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="fullName"
                                >
                                  <Form.Label className="custom-label">
                                    Nama Lengkap
                                  </Form.Label>
                                  <Form.Control
                                    id={index}
                                    type="text"
                                    placeholder="Nama Lengkap"
                                    onChange={(e) => {
                                      setPassengersFullName(e.target.value);
                                    }}
                                    value={passengersFullName}
                                    style={{
                                      borderRadius: "8px",
                                      padding: "10px",
                                      border: "1px black solid",
                                    }}
                                  />
                                </Form.Group>

                                <Form.Group
                                  as={Row}
                                  className="mb-3"
                                  controlId="familyName"
                                >
                                  <Form.Label
                                    column
                                    sm="8"
                                    className="custom-label"
                                  >
                                    Punya Nama Keluarga?
                                  </Form.Label>
                                  <Col sm="4" className="text-end">
                                    <Form.Check
                                      type="switch"
                                      id="hasLastName"
                                      checked={hasLastName}
                                      onChange={(e) =>
                                        setHasLastName(e.target.checked)
                                      }
                                      className="custom-switch"
                                    />
                                  </Col>
                                </Form.Group>

                                {hasLastName && (
                                  <Form.Group
                                    className="mb-3"
                                    controlId="lastName"
                                  >
                                    <Form.Label className="custom-label">
                                      Nama Keluarga
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Nama Keluarga"
                                      onChange={(e) => {
                                        setPassengersFamilyName(e.target.value);
                                      }}
                                      value={passengersFamilyName}
                                      style={{
                                        borderRadius: "8px",
                                        padding: "10px",
                                        border: "1px black solid",
                                      }}
                                    />
                                  </Form.Group>
                                )}

                                <Form.Group
                                  className="mb-3"
                                  controlId="bornDate"
                                >
                                  <Form.Label
                                    column
                                    sm="8"
                                    className="custom-label"
                                  >
                                    Tanggal Lahir
                                  </Form.Label>
                                  <Col
                                    sm="12"
                                    className="text-end custom-width"
                                  >
                                    <Form.Control
                                      type="date"
                                      placeholder="yyyy-mm-dd"
                                      value={passengersBirthDate}
                                      onChange={(e) => {
                                        setPassengersBirthDate(e.target.value);
                                      }}
                                      style={{
                                        borderRadius: "8px",
                                        padding: "10px",
                                        border: "1px black solid",
                                      }}
                                    />
                                  </Col>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="contry">
                                  <Form.Label className="custom-label">
                                    Kewarganegaraan
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Indonesia"
                                    onChange={(e) => {
                                      setPassengersCitizenship(e.target.value);
                                    }}
                                    value={passengersCitizenship}
                                    style={{
                                      borderRadius: "8px",
                                      padding: "10px",
                                      border: "1px black solid",
                                    }}
                                  />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="ktp">
                                  <Form.Label className="custom-label">
                                    KTP / Paspor
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder=""
                                    onChange={(e) => {
                                      setPassengersIdentityNumber(
                                        e.target.value
                                      );
                                    }}
                                    value={passengersIdentityNumber}
                                    style={{
                                      borderRadius: "8px",
                                      padding: "10px",
                                      border: "1px black solid",
                                    }}
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3"
                                  controlId="publisherCountry"
                                >
                                  <Form.Label className="custom-label">
                                    Negara Penerbit
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder=""
                                    onChange={(e) => {
                                      setPassengersPublisherCountry(
                                        e.target.value
                                      );
                                    }}
                                    value={passengersPublisherCountry}
                                    style={{
                                      borderRadius: "8px",
                                      padding: "10px",
                                      border: "1px black solid",
                                    }}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="endDate"
                                >
                                  <Form.Label
                                    column
                                    sm="8"
                                    className="custom-label"
                                  >
                                    Berlaku Sampai
                                  </Form.Label>
                                  <Col
                                    sm="12"
                                    className="text-end custom-width"
                                  >
                                    <Form.Control
                                      type="date"
                                      placeholder="yyyy-mm-dd"
                                      value={passengersExpiredAt}
                                      onChange={(e) => {
                                        setPassengersExpiredAt(e.target.value);
                                      }}
                                      style={{
                                        borderRadius: "8px",
                                        padding: "10px",
                                        border: "1px black solid",
                                      }}
                                    />
                                  </Col>
                                </Form.Group>
                              </div>
                            </Card.Body>
                          </Card>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="container">
                  {/* SeatPenumpang */}
                  <div className="">
                    <Card
                      style={{
                        padding: "15px",
                        border: "1px #3C3C3C solid",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Card.Title
                        style={{ marginBottom: "30px", fontWeight: "700" }}
                      >
                        Pilih Kursi
                      </Card.Title>
                      <Card.Subtitle
                        className="mb-3 text-white text-center"
                        style={{
                          backgroundColor: "#73CA5C",
                          borderRadius: "4px 4px 1px 1px",
                          padding: "10px 15px",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        Economy - {totalSeats} Seats Available
                      </Card.Subtitle>
                      <Card.Body>
                        <div
                          className="d-flex"
                          style={{
                            justifyContent: "space-between",
                            alignItems: "center", // Opsional, untuk menyelaraskan secara vertikal
                            width: "100%", // Pastikan flex container memiliki lebar penuh
                          }}
                        >
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "0px 8px",
                              maxWidth: "120px", // Lebar total = 3 kolom * (lebar tombol + margin)
                              margin: "0 auto", // Untuk membuatnya di tengah
                            }}
                          >
                            {seatsLeft}
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(1, 0.5fr)",
                              gap: "2px 4px",
                              maxWidth: "120px", // Lebar total = 3 kolom * (lebar tombol + margin)
                              margin: "0 auto", // Untuk membuatnya di tengah
                            }}
                          >
                            {totalRows}
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "0px 8px",
                              maxWidth: "120px", // Lebar total = 3 kolom * (lebar tombol + margin)
                              margin: "0 auto", // Untuk membuatnya di tengah
                              backgrounColor: "none",
                            }}
                          >
                            {seatsRight}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="container pt-3">
                <button
                  type="submit"
                  class="btn btn-kirim fw-bolder"
                  disabled={isUpdateProcessing}
                  style={{
                    backgroundColor: "#7126B5",
                    color: "white",
                    width: "30rem",
                  }}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>

          <div className=" flight-detail-layout w-25">
            <div className="container row">
              <div className="fw-bolder fs-5 pt-1">Detail Penerbangan</div>
              <FlightDetail data={details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
