import { createLazyFileRoute } from "@tanstack/react-router";
import PemesananItem from "../components/payment/paymentPemesanan";
import BookingFormPassanger from "../components/payment/paymentPassenger";
import FlightDetail from "../components/payment/flightDetail";
import DataPassangers from "../data/data.json";
import AlertDanger from "../components/payment/alertDanger";
import BreadCrumb from "../components/payment/breadCrumbs";
import PassangerSeat from "../components/payment/passangerSeat";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCheckoutByID } from "../services/checkout/checkout";
import { useState } from "react";
import "../components/payment/payment.css";

export const Route = createLazyFileRoute("/checkout-biodata")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [flightPassenger, setFlightPassenger] = useState([]);
  const {
    data,
    selectedDepartureCity,
    selectedReturnCity,
    selectedDepartureDate,
    selectedReturnDate,
    selectedClass,
    selectedPassengers,
  } = location.state || {}; // Menggunakan default object jika state tidak ada

  if (!data || !data.transaction) {
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

  const {
    data: details,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detail", data.transaction.userId, data.transaction.id],
    queryFn: () =>
      getCheckoutByID(data.transaction.userId, data.transaction.id),
    enabled: !!token, // Pastikan ada parameter yang diperlukan sebelum menjalankan query
  });

  useEffect(() => {
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


  console.log(details);

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
          <AlertDanger />
        </div>
      </div>
      <div className="container content-container">
        <div className="d-flex justify-content-center gap-5">
          <div>
            <div className="">
              <div className="container">
                <PemesananItem />
              </div>

              {DataPassangers.length === 0 ? (
                <h1>No Found Data Passangger</h1>
              ) : (
                <div className="container mt-4">
                  <BookingFormPassanger />
                </div>
              )}

              <div className="container">
                <PassangerSeat />
              </div>
            </div>
            <div className="container pt-3">
              <button
                type="button"
                onClick={() => navigate({ to: "/payment" })}
                class="btn btn-kirim fw-bolder"
                style={{
                  backgroundColor: "#7126B5",
                  color: "white",
                  width: "30rem",
                }}
              >
                {data.transaction.id}
              </button>
            </div>
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
