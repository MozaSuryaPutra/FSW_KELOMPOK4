import { createLazyFileRoute } from "@tanstack/react-router";
import PemesananItem from "../components/payment/paymentPemesanan";
import BookingFormPassanger from "../components/payment/paymentPassenger";
import FlightDetail from "../components/payment/flightDetail";
import FlightDetailPayment from "../components/payment/flightDetailPayment";
import DataPassangers from "../data/data.json";
import AlertDanger from "../components/payment/alertDanger";
import BreadCrumb from "../components/payment/breadCrumbs";
import PassangerSeat from "../components/payment/passangerSeat";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCheckoutByID, updateCheckout } from "../services/checkout/checkout";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import SeatSelector from "../components/SeatSelector/SeatSelector";
import { createPayment } from "../services/checkout/payment";
import "../components/payment/payment.css";

export const Route = createLazyFileRoute("/checkout-biodata")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();
  const token = useSelector((state) => state.auth.token);
  const [outboundSeatIds, setOutboundSeatIds] = useState([]);
  const [returnSeatIds, setReturnSeatIds] = useState([]);
  const userIds = useSelector((state) => {
    const userString = state.auth.user; // Ambil string JSON dari state
    const user = userString ? JSON.parse(userString) : null; // Parse string menjadi objek
    return user?.id; // Kembalikan id jika user ada
  });

  const { data: routeData, selectedClass } = location.state || {};
  const [userId, setUserId] = useState(0);
  const [transactionId, setTransactionId] = useState(0);
  const [loading, setLoading] = useState(false); // State untuk kontrol loading
  //Ini Untuk Form isi
  const [formData, setFormData] = useState({
    userId: userIds,
    transactionId: routeData?.transaction?.id,
    orderer: {
      fullname: "",

      numberPhone: "",
      email: "",
    },
    passengers: [],
    seatIds: [],
  });
  const { selectedPassengers: passengers } = location.state || {};
  useEffect(() => {
    const generatePassengers = () => {
      const newPassengers = [];
      for (let i = 0; i < passengers?.adult; i++) {
        newPassengers.push({
          title: "",
          passengerType: "adult",
          fullname: "",

          birthDate: "",
          citizenship: "",
          identityNumber: "",
          publisherCountry: "",
          expiredAt: "",
        });
      }
      for (let i = 0; i < passengers?.child; i++) {
        newPassengers.push({
          title: "",
          passengerType: "child",
          fullname: "",

          birthDate: "",
          citizenship: "",
          identityNumber: "",
          publisherCountry: "",
          expiredAt: "",
        });
      }
      setFormData((prev) => ({ ...prev, passengers: newPassengers }));
    };

    generatePassengers();
  }, [passengers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrdererChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedOrderer = { ...prev.orderer };

      if (value === undefined) {
        // Hapus properti jika nilai undefined
        delete updatedOrderer[name];
      } else {
        // Perbarui nilai properti
        updatedOrderer[name] = value;
      }

      return { ...prev, orderer: updatedOrderer };
    });
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedPassengers = [...prev.passengers];

      if (value === undefined) {
        // Hapus properti jika nilai undefined
        delete updatedPassengers[index][name];
      } else {
        // Perbarui nilai properti
        updatedPassengers[index][name] = value;
      }

      return { ...prev, passengers: updatedPassengers };
    });
  };

  const handleSeatSelection = (selectedSeats) => {
    setOutboundSeatIds(selectedSeats); // Untuk seat pergi
  };

  const handleSeatsSelection = (selectedSeats) => {
    setReturnSeatIds(selectedSeats); // Untuk seat kembali
  };
  const { mutate: updateCheckouts } = useMutation({
    mutationFn: (body) => {
      console.log("Login mutation called with body:", body);
      setLoading(true);
      return updateCheckout(body);
    },
    onSuccess: async (data) => {
      toast.success("Berhasil Menyimpan Data");
      console.log("Data on success:", data);

      if (data) {
        await queryClient.invalidateQueries("detail"); // Nama query yang perlu dirujuk ulang
      }
      setLoading(false);
    },
    onError: (err) => {
      toast.error(err?.message);
      setLoading(false);
    },
  });
  const { mutate: create, isPending } = useMutation({
    mutationFn: (request) => createPayment(request),
    onSuccess: (data) => {
      console.log("ini isi payment : ", data);
      navigate({
        to: "/checkout-success",
        state: {
          transactionId,
        },
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
  // Default hooks harus tetap dipanggil
  const {
    data: details,
    isSuccess,
    isLoading,

    isError,
    error,
  } = useQuery({
    queryKey: [
      "detail",
      routeData?.transaction?.userId,
      routeData?.transaction?.id,
    ],
    queryFn: () =>
      getCheckoutByID(
        routeData?.transaction?.userId,
        routeData?.transaction?.id
      ),
    enabled: !!token && !!routeData?.transaction, // Query hanya berjalan jika data lengkap
  });

  useEffect(() => {
    if (isSuccess) {
      setUserId(details?.transaction.userId);
      setTransactionId(details?.transaction.id);
    } else if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [details, isSuccess, navigate]);

  // Handling state
  const renderContent = () => {
    if (!token) {
      navigate({ to: "/" });
      return (
        <div className="text-center">
          <h1>Redirecting...</h1>
        </div>
      );
    }

    if (!routeData || !routeData.transaction) {
      return (
        <div className="text-center">
          <h1>Anda harus memilih terlebih dahulu</h1>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate({ to: "/" })}
          >
            Kembali ke Beranda
          </button>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      );
    }

    if (isError) {
      console.error("Error fetching flight data:", error);
      return (
        <div className="text-center">
          <p>Error: Tidak dapat memuat data. Silakan coba lagi nanti.</p>
        </div>
      );
    }
    const handleSubmit = async (e) => {
      e.preventDefault();

      const missingFields = {
        orderer: [],
        passengers: [],
      };

      // Validasi untuk field pemesan (orderer)
      Object.entries(formData.orderer).forEach(([key, value]) => {
        if (value.trim() === "") {
          missingFields.orderer.push(key);
        }
      });

      // Validasi untuk field penumpang (passengers)
      formData.passengers.forEach((passenger, index) => {
        Object.entries(passenger).forEach(([key, value]) => {
          if (value.trim() === "") {
            missingFields.passengers.push(`Penumpang ${index + 1}: ${key}`);
          }
        });
      });

      const errors = [];
      if (missingFields.orderer.length > 0) {
        errors.push(
          <li key="orderer">
            Informasi pemesan yang belum lengkap:
            <ul>
              {missingFields.orderer.map((field) => (
                <li key={field}> {field}</li>
              ))}
            </ul>
          </li>
        );
      }
      if (missingFields.passengers.length > 0) {
        errors.push(
          <li key="passengers">
            Informasi penumpang yang belum lengkap:
            <ul>
              {missingFields.passengers.map((field, idx) => (
                <li key={`${field}-${idx}`}>{field}</li>
              ))}
            </ul>
          </li>
        );
      }

      if (errors.length > 0) {
        toast(
          <div>
            <strong>Harap lengkapi data berikut:</strong>
            <ul>{errors}</ul>
          </div>,
          {
            position: "top-right",
            closeOnClick: true,
            hideProgressBar: true,
          }
        );
        return;
      }

      // Jika validasi lolos, lanjutkan
      const data = {
        ...formData,
        userId: parseInt(userIds, 10),
        transactionId: parseInt(formData?.transactionId, 10),
        orderer: JSON.stringify(formData?.orderer),
        passengers: JSON.stringify(formData?.passengers),
        seatIds: JSON.stringify([...outboundSeatIds, ...returnSeatIds]), // Gabungkan seatIds dari pergi dan kembali
      };

      console.log("Data siap dikirim:", data.seatIds);
      console.log("Data asli:", data);

      updateCheckouts(data);
    };

    const inSubmit = async (event) => {
      event.preventDefault();

      const request = {
        userId: userIds,
        transactionId,
      };
      create(request);
    };
    const Countdown = ({ expiredFilling }) => {
      // 1. Menghitung selisih waktu pada saat komponen pertama kali dimuat
      const calculateTimeLeft = () => {
        const nowLocal = new Date(); // Waktu lokal saat ini
        const expiredFillingDate = new Date(expiredFilling); // Waktu expiredFilling dalam format UTC/ISO
        const expiredFillingLocal = new Date(
          expiredFillingDate.toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
          })
        ); // Waktu expiredFilling diubah ke waktu lokal (misal: Jakarta)

        const timeDifference =
          expiredFillingLocal.getTime() - nowLocal.getTime(); // Selisih dalam milidetik

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
    console.log("saya details", details);
    console.log(outboundSeatIds);
    console.log(returnSeatIds);
    console.log("Ini form data :", formData);
    // Render utama
    return (
      <div className="row g-3 m-0">
        {(loading || isPending) && (
          <Modal show={true} backdrop="static" keyboard={false}>
            <Modal.Body>
              <div style={{ textAlign: "center" }}>
                <h4>Loading...</h4>
                {/* Anda bisa menambahkan spinner atau elemen loading lainnya */}
              </div>
            </Modal.Body>
          </Modal>
        )}
        <div
          className="border-bottom border-dark p-2 mb-2 border-opacity-10"
          style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="fs-5 text-dark">
            <BreadCrumb />
          </div>
          <div className="text-center">
            <div className="container">
              <div
                className="p-3 fw-bolder fs-6 border rounded-3"
                style={{
                  backgroundColor: details?.orderer?.email
                    ? "rgba(115, 202, 92, 1)" // Warna hijau jika validasi terpenuhi
                    : "#dc3545", // Warna merah jika tidak
                  color: "white",
                  borderColor: details?.orderer?.email
                    ? "rgba(115, 202, 92, 0.8)" // Sesuaikan dengan warna hijau
                    : "#dc3545",
                }}
              >
                {details?.orderer?.email ? (
                  "Data Anda berhasil tersimpan!" // Pesan sukses
                ) : (
                  <Countdown
                    expiredFilling={details?.transaction?.expiredFilling}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container content-container">
          <div className="d-flex justify-content-center gap-5">
            <form onSubmit={handleSubmit}>
              <div>
                <div
                  className="container"
                  style={{
                    pointerEvents: details?.orderer?.email ? "none" : "auto", // Nonaktifkan interaksi jika email ada
                    opacity: details?.orderer?.email ? 0.6 : 1, // Redupkan untuk memberi indikasi nonaktif
                  }}
                >
                  <PemesananItem
                    ordererData={details}
                    handleOrdererChange={handleOrdererChange}
                  />
                </div>

                {DataPassangers.length === 0 ? (
                  <h1>No Found Data Passenger</h1>
                ) : (
                  <div
                    className="container mt-4"
                    style={{
                      pointerEvents: details?.orderer?.email ? "none" : "auto",
                      opacity: details?.orderer?.email ? 0.6 : 1,
                    }}
                  >
                    <BookingFormPassanger
                      ordererData={details}
                      formData={formData}
                      handlePassengerChange={handlePassengerChange}
                    />
                  </div>
                )}

                <div
                  className="container"
                  style={{
                    pointerEvents: details?.orderer?.email ? "none" : "auto",
                    opacity: details?.orderer?.email ? 0.6 : 1,
                  }}
                >
                  <div>
                    <h3>Select Departure Seats</h3>
                    <SeatSelector
                      seats={details?.flights?.departure?.airplane?.seat}
                      passengerCount={passengers}
                      onSeatSelect={handleSeatSelection}
                      classs={selectedClass}
                      details={details}
                    />
                  </div>
                  {details?.flights?.return?.airplane?.seat.length > 0 && (
                    <div>
                      <h3>Select Return Seats</h3>
                      <SeatSelector
                        seats={details?.flights?.return?.airplane?.seat}
                        passengerCount={passengers}
                        onSeatSelect={handleSeatsSelection}
                        classs={selectedClass}
                        details={details}
                      />
                    </div>
                  )}
                </div>

                <div className="container pt-3">
                  <button
                    type="submit"
                    className="btn btn-kirim fw-bolder"
                    style={{
                      backgroundColor: details?.orderer?.email
                        ? "#B3A7CC"
                        : "#7126B5",
                      color: "white",
                      width: "30rem",
                      cursor:
                        details?.orderer?.email || loading
                          ? "not-allowed"
                          : "pointer", // Disable cursor jika loading atau email ada
                      opacity: details?.orderer?.email || loading ? 0.6 : 1, // Menurunkan opacity saat loading atau ada email
                    }}
                    disabled={details?.orderer?.email || loading} // Tombol dinonaktifkan jika ada email atau sedang loading
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <div className="flight-detail-layout w-25">
              <div className="container row">
                <div className="fw-bolder fs-5 pt-1">Detail Penerbangan</div>
                <FlightDetail flighter={details} />
                {details?.orderer?.email && (
                  <div className="text-center pt-3">
                    <button
                      className="btn btn-danger w-100"
                      onClick={inSubmit}
                      style={{ fontWeight: "bold" }}
                    >
                      Lanjut Bayar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
}
