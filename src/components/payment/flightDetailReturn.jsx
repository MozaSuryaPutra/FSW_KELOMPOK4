import React, { useState, useEffect } from "react";
import planeLogo from "../../../public/plane-logo-Image.png";

const FlightDetailReturn = ({ flighter }) => {
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
    <div
      className="card shadow-lg p-4 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#f7f7f7" }}
    >
      <div className="card-body">
        {/* Departure Information */}
        <div className="departureFlightInformation mb-4">
          <div className="row">
            <div className="col-12 text-center fw-bolder mb-3">
              Kepulangan Anda
            </div>
            <div className="col-6 fw-bolder">
              {flightData?.flights?.return?.departureDate
                .toString()
                .substring(11, 16)}
            </div>
            <div
              className="col-6 text-end fw-semibold"
              style={{ color: "#A06ECE" }}
            >
              Keberangkatan
            </div>
            <div className="departureDate simpleText mb-2">
              {new Date(
                flightData?.flights?.return?.departureDate
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="departureTerminal fw-semibold">
              Soekarno Hatta -{" "}
              {flightData?.flights?.return?.departureTerminal?.name ||
                "Terminal A"}
            </div>
          </div>
        </div>

        {/* Departure Information */}
        <div className="departureInformation mb-4">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11">
              <div className="planeClass fw-bolder">
                {flightData?.flights?.return?.airplane?.airline?.name.toUpperCase()}
                - {flightData?.flights?.return?.class.toUpperCase()}
              </div>
              <div className="plateType fw-bolder">
                {flightData?.flights?.return?.airplane?.airplaneCode.substring(
                  0,
                  2
                )}{" "}
                -{" "}
                {flightData?.flights?.return?.airplane?.airplaneCode.substring(
                  2,
                  5
                )}
              </div>
            </div>
          </div>

          <div className="row pt-2">
            <div className="col-1">
              <img src={planeLogo} alt="Plane Logo" />
            </div>
            <div className="col-11">
              <div className="fw-bolder">Informasi :</div>
              <div>
                Baggage {flightData?.flights?.return?.airplane?.baggage} Kg
              </div>
              <div>
                Cabin Baggage{" "}
                {flightData?.flights?.return?.airplane?.cabinBaggage} Kg
              </div>
              <div>{flightData?.flights?.return?.airplane?.description}</div>
            </div>
          </div>
        </div>

        {/* Arrival Information */}
        <div className="arrivalFlightInformation mb-4">
          <div className="row">
            <div className="col-6 fw-bolder">
              {flightData?.flights?.return?.arrivalDate
                .toString()
                .substring(11, 16)}
            </div>
            <div
              className="col-6 text-end fw-semibold"
              style={{ color: "#A06ECE" }}
            >
              Kedatangan
            </div>
            <div className="departureDate mb-2">
              {new Date(
                flightData?.flights?.return?.arrivalDate
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="departureTerminal fw-semibold">
              {flightData?.flights?.return?.departureAirport?.name ||
                "Unknown Terminal"}{" "}
              Airport
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="detailPrice row px-2 mb-4">
          <div className="col-12 fw-bolder">Rincian Harga</div>
          {Object.entries(
            flightData?.priceDetails?.passenger
              ?.filter((item) => item.flightType === "return") // Filter berdasarkan flightType
              .reduce((acc, item) => {
                // Jika tipe sudah ada, tambahkan count dan total
                if (acc[item.type]) {
                  acc[item.type].count += item.count;
                  acc[item.type].total += item.total;
                } else {
                  // Jika tipe belum ada, tambahkan data baru
                  acc[item.type] = { ...item };
                }
                return acc;
              }, {})
          ).map(([type, data], index) => (
            <React.Fragment key={index}>
              <div className="col-6">
                {data.count} {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
              <div className="col-6 text-end">
                IDR {data.total.toLocaleString("id-ID")}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailReturn;
