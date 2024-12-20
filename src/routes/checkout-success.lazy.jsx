import { createLazyFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { createPayment } from "../services/checkout/payment.js";
import { getCheckoutByID } from "../services/checkout/checkout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useSnap from "../hooks/useSnap";
//import FlightDetail from "../components/payment/flightDetail";
import FlightDetailPayment from "../components/payment/flightDetailPayment.jsx";
import { toast } from "react-toastify";
export const Route = createLazyFileRoute("/checkout-success")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [snapVisible, setSnapVisible] = useState(false);
  const { snapEmbed } = useSnap();
  // The state object contains userId and transactionId
  const userId = useSelector((state) => {
    const userString = state.auth.user; // Ambil string JSON dari state
    const user = userString ? JSON.parse(userString) : null; // Parse string menjadi objek
    return user?.id; // Kembalikan id jika user ada
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
  console.log("ini adalah details", details, userId, transactionId);
  const { mutate: create, isPending } = useMutation({
    mutationFn: (request) => createPayment(request),
    onSuccess: (data) => {
      if (data.snapToken) {
        setSnapVisible(true); // Ubah tampilan snap
        snapEmbed(data.snapToken, "snap-container", {
          onSuccess: (result) => {
            console.log("Payment Success:", result);
            if (result.transaction_status == "settlement") {
              navigate({
                to: "/payment/finish",
              });
            }
          },
          onPending: (result) => {
            console.log("Payment Pending:", result);
          },
          onClose: () => {
            console.log("Snap Closed");
          },
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    } else if (error) {
      console.error("Error fetching flight data:", error);
    }
  }, [details, isSuccess, error, token, navigate]);

  // Now you can use userId and transactionId in your component logic
  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      userId,
      transactionId,
    };
    create(request);
  };

  // mengubah format expiredFilling :
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
  console.log("Ini adalah", details);

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
            {/* <div className="container">Isi Data Pembayaran</div> */}
            {/* Accordion section */}
            {!snapVisible && (
              <div className="container">
                <div className="accordion pt-2" id="accordionExample">
                  <div className="accordion-item mb-3 ">
                    <h2 className="accordion-header " id="headingOne">
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
                        {/* Isikan form atau konten lainnya di sini */}
                        Form pembayaran atau informasi lainnya di sini.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item mb-3">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button fs-5 fw-medium bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Credit Card
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {/* Isi dengan metode pembayaran */}
                        Pilih metode pembayaran Anda.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item mb-4">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button fs-5 fw-medium bg-dark text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Credit Card
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className=""></div>
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

          {/* ----------------------------------------------------------- */}
          <div className=" flight-detail-layout w-25">
            <div className="container row">
              {snapVisible && (
                <div className="fw-bolder fs-5 pt-1">
                  Booking Code :{" "}
                  <span style={{ color: "#7126B5" }}>
                    {" "}
                    {details.orderer.bookingCode}
                  </span>
                </div>
              )}

              {!snapVisible && (
                <div className="fw-bolder fs-5 pt-1">Detail Penerbangan</div>
              )}
              <FlightDetailPayment data={details} />
              {!snapVisible && (
                <form onSubmit={onSubmit}>
                  {/* <div className="container pt-3"> */}
                  <button
                    type="submit"
                    className="btn btn-kirim fw-bolder"
                    disabled={isPending}
                    style={{
                      backgroundColor: "#7126B5",
                      color: "white",
                      width: "23rem",
                      marginTop: "20px",
                    }}
                  >
                    Bayar Sekarang
                  </button>
                  {/* </div> */}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
