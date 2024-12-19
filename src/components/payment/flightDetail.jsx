import React, { useState, useEffect } from "react";
import planeLogo from "../../../public/plane-logo-Image.png";

const FlightDetail = ({ flighter }) => {
  const [flightData, setFlightData] = useState(null); // Menyimpan data JSON

  useEffect(() => {
    if (flighter) {
      setFlightData(flighter); // Mengambil data JSON dan menyimpannya ke state
    }
  }, [flighter]);

  // Menunggu data tersedia sebelum menampilkan
  if (!flightData) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="departureFlight">
      <div className="departureFlightInformation border-bottom border-dark-subtle pb-2">
        <div className="row">
          <div className="col-6 fw-bolder">07.00</div>
          <div
            className="col-6 text-end fw-semibold"
            style={{ color: "#A06ECE" }}
          >
            Keberangkatan
          </div>
          <div className="departureDate simpleText">3 Maret 2023</div>
          <div className="departureTerminal fw-semibold">
            Soekarno Hatta -{" "}
            {flightData?.flights?.departure?.departureTerminal?.name ||
              "Unknown Terminal"}
          </div>
        </div>
      </div>

      <div className="departureInformation border-bottom border-dark-subtle pb-2">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            <div className="planeClass fw-bolder">Jet Air - Economy</div>
            <div className="plateType fw-bolder">JT - 203</div>
          </div>
        </div>

        <div className="row pt-2">
          <div className="col-1">
            <img src={planeLogo} alt="Plane Logo" />
          </div>
          <div className="col-11">
            <div className="fw-bolder">Informasi :</div>
            <div>Baggage 20kg</div>
            <div>Cabin baggage 7kg</div>
            <div>In Flight Entertainment</div>
          </div>
        </div>
      </div>

      <div className="arrivaFlightInformation border-bottom border-dark-subtle pb-2">
        <div className="row">
          <div className="col-6 fw-bolder">11.00</div>
          <div
            className="col-6 text-end fw-semibold"
            style={{ color: "#A06ECE" }}
          >
            Kedatangan
          </div>
          <div className="departureDate">3 Maret 2023</div>
          <div className="departureTerminal fw-semibold">
            Melbourne International Airport
          </div>
        </div>
      </div>

      <div className="detailPrice row px-2 border-bottom border-dark-subtle pb-2">
        <div className="col-12 fw-bolder">Rincian Harga</div>
        <div className="col-6">2 Adults</div>
        <div className="col-6 text-end">IDR 9.550.000</div>
        <div className="col-6">1 Baby</div>
        <div className="col-6 text-end">IDR 0</div>
        <div className="col-6">Tax</div>
        <div className="col-6 text-end">IDR 300.000</div>
      </div>

      <div className="detailPrice row px-2 pt-3">
        <div className="col-6 fw-bolder fs-5">Total</div>
        <div
          className="col-6 fw-bolder fs-5 text-end"
          style={{ color: "#7126B5" }}
        >
          {flightData?.flights?.departure?.id || "Unknown ID"}
        </div>
      </div>

      {/* Tombol "Lanjut Bayar" jika email sudah ada */}


    </div>
  );
};

export default FlightDetail;
