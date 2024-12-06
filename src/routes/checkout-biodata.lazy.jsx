import { createLazyFileRoute } from "@tanstack/react-router";
import PemesananItem from "../components/payment/paymentPemesanan";
import BookingFormPassanger from "../components/payment/paymentPassenger";
import FlightDetail from "../components/payment/flightDetail";
import DataPassangers from "../data/data.json";
import AlertDanger from "../components/payment/alertDanger";
import BreadCrumb from "../components/payment/breadCrumbs";
import PassangerSeat from "../components/payment/passangerSeat";
import { useNavigate } from "@tanstack/react-router";
import "../components/payment/payment.css";

export const Route = createLazyFileRoute("/checkout-biodata")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
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
                Simpan
              </button>
            </div>
          </div>

          <div className=" flight-detail-layout w-25">
            <div className="container row">
              <div className="fw-bolder fs-5 pt-1">Detail Penerbangan</div>
              <FlightDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
