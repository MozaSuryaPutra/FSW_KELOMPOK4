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
import { useQuery } from "@tanstack/react-query";
import { getCheckoutByID } from "../services/checkout/checkout";
import "../components/payment/payment.css";

export const Route = createLazyFileRoute("/checkout-biodata")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const { data: routeData } = location.state || {};

  // Default hooks harus tetap dipanggil
  const {
    data: details,
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

    // Render utama
    return (
      <div className="row g-3 m-0">
        <div
          className="border-bottom border-dark p-2 mb-2 border-opacity-10"
          style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="fs-5 text-dark">
            <BreadCrumb />
          </div>
          <div className="text-center">
            <AlertDanger />
          </div>
        </div>
        <div className="container content-container">
          <div className="d-flex justify-content-center gap-5">
            <div>
              <div className="container">
                <PemesananItem />
              </div>

              {DataPassangers.length === 0 ? (
                <h1>No Found Data Passenger</h1>
              ) : (
                <div className="container mt-4">
                  <BookingFormPassanger />
                </div>
              )}

              <div className="container">
                <PassangerSeat />
              </div>

              <div className="container pt-3">
                <button
                  type="button"
                  onClick={() => navigate({ to: "/payment" })}
                  className="btn btn-kirim fw-bolder"
                  style={{
                    backgroundColor: "#7126B5",
                    color: "white",
                    width: "30rem",
                  }}
                >
                  {routeData.transaction.id}
                </button>
              </div>
            </div>

            <div className="flight-detail-layout w-25">
              <div className="container row">
                <div className="fw-bolder fs-5 pt-1">Detail Penerbangan</div>
                <FlightDetail flighter={details} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
}
