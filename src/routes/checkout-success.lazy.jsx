import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useSnap from "../hooks/useSnap";
import FlightDetailPayment from "../components/payment/flightDetailPayment.jsx";
import { getCheckoutByID } from "../services/checkout/checkout";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/checkout-success")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [snapVisible, setSnapVisible] = useState(false);
  const { snapEmbed } = useSnap(); // Assuming snapEmbed is available

  const userId = useSelector((state) => {
    const userString = state.auth.user;
    const user = userString ? JSON.parse(userString) : null;
    return user?.id;
  });

  const { transactionId } = location.state || {};

  const {
    data: details,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detail", userId, transactionId],
    queryFn: () => getCheckoutByID(userId, transactionId),
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    } else if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [details, isSuccess, error, token, navigate]);

  useEffect(() => {
    if (
      details?.transaction?.snapToken &&
      details?.transaction?.status === "unpaid"
    ) {
      if (!snapVisible) {
        setSnapVisible(true);
      }
    }
  }, [details, snapVisible]);

  useEffect(() => {
    if (snapVisible) {
      // Hapus kontainer snap yang ada sebelumnya jika ada
      const snapContainer = document.getElementById("snap-container");
      if (snapContainer) {
        snapContainer.innerHTML = ""; // Hapus konten lama
      }

      // Menunggu beberapa saat untuk memastikan kontainer bersih sebelum embedding
      setTimeout(() => {
        // Sekarang coba untuk embed Snap
        snapEmbed(details?.transaction?.snapToken, "snap-container", {
          onSuccess: (result) => {
            console.log("Payment Success", result);
            if (result.transaction_status === "settlement") {
              navigate({ to: "/payment-finish" });
            }
          },
          onPending: (result) => {
            console.log("Payment pending", result);
          },
          onClose: () => {
            console.log("Snap closed");
          },
        });
      }, 300);
    }
  }, [snapVisible, details, snapEmbed, navigate]);

  function formatToLocalDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="payment-display">
        <div
          className="border-bottom border-dark p-2 mb-2 border-opacity-10"
          style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="container fw-bolder fs-5 text-dark">
            <nav
              style={{ "--bs-breadcrumb-divider": "'>'" }}
              aria-label="breadcrumb"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a>Isi Data Diri</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <a href="#">Bayar</a>
                </li>
                <li className="breadcrumb-item">
                  <a>Selesai</a>
                </li>
              </ol>
            </nav>
          </div>

          <div className="container">
            {snapVisible && (
              <div className="p-3 text-white text-center fw-bolder fs-6 bg-danger border border-danger-subtle rounded-3">
                Selesaikan Pembayaran sampai{" "}
                {formatToLocalDateTime(details.transaction.expiredPayment)}
              </div>
            )}
            {!snapVisible && (
              <div
                className="p-3 text-white text-center fw-bolder fs-6 border rounded-3"
                style={{ backgroundColor: "#73CA5C" }}
              >
                Data Anda berhasil tersimpan!
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center gap-5">
          <div className="left-layout fw-bolder fs-5" style={{ width: "32%" }}>
            {!snapVisible && (
              <div className="container">
                <div className="accordion pt-2" id="accordionExample">
                  <div className="accordion-item mb-3">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button fs-5 fw-medium bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Gopay
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Form pembayaran atau informasi lainnya di sini.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              id="snap-container"
              style={{
                display: snapVisible ? "block" : "none",
                minHeight: "500px",
                width: "30rem",
                marginBottom: "50px",
              }}
            ></div>
          </div>

          <div className="flight-detail-layout w-25">
            <div className="container row">
              {snapVisible && (
                <div className="fw-bolder fs-5 pt-1">
                  Booking Code :{" "}
                  <span style={{ color: "#7126B5" }}>
                    {details.orderer.bookingCode}
                  </span>
                </div>
              )}
              {!snapVisible && (
                <div className="fw-bolder fs-5 pt-1">Detail Penerbangan</div>
              )}
              <FlightDetailPayment data={details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
