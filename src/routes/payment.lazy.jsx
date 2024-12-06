import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import FlightDetail from "../components/payment/flightDetail";
import { useNavigate } from "@tanstack/react-router";
import "../components/payment/payment.css";

export const Route = createLazyFileRoute("/payment")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
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
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
        </div>

        <div className="container">
          <div className="p-3 text-white text-center fw-bolder fs-6 bg-danger border border-danger-subtle rounded-3">
            Selesaikan Pembayaran sampai 10 Maret 2023 12:00
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center gap-5">
        <div className="left-layout fw-bolder fs-5" style={{ width: "32%" }}>
          <div className="container">Isi Data Pembayaran</div>

          {/* Accordion section */}
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

          <div className="btn-bayar container">
            <button
              class="btn text-white fw-medium py-3 fs-5"
              onClick={() => navigate({ to: "/payment-success" })}
              style={{ backgroundColor: "#7126B5", width: "100%" }}
              type="button"
            >
              Bayar
            </button>
          </div>
        </div>
        <div className=" flight-detail-layout w-25">
          <div className="container row">
            <div className="fw-bolder fs-5 pt-1">
              Booking Code : <span style={{ color: "#7126B5" }}> 987FETGR</span>
            </div>
            <FlightDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
