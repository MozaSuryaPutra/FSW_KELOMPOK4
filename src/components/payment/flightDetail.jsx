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
    <div
      className="card shadow-lg p-4 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#f7f7f7" }}
    >
      <div className="card-body">
        <div className="departureFlightInformation mb-4">
          <div className="row">
            <div className="col-12 text-center fw-bolder mb-3">
              Keberangkatan Anda
            </div>
            <div className="col-6 fw-bolder">
              {flightData?.flights?.departure?.departureDate
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
                flightData?.flights?.departure?.departureDate
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="departureTerminal fw-semibold">
              Soekarno Hatta -{" "}
              {flightData?.flights?.departure?.departureTerminal?.name ||
                "Unknown Terminal"}
            </div>
          </div>
        </div>

        <div className="departureInformation mb-4">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11">
              <div className="planeClass fw-bolder">
                {flightData?.flights?.departure?.airplane?.airline?.name.toUpperCase()}{" "}
                - {flightData?.flights?.departure?.class.toUpperCase()}
              </div>
              <div className="plateType fw-bolder">
                {flightData?.flights?.departure?.airplane?.airplaneCode.substring(
                  0,
                  2
                )}{" "}
                -{" "}
                {flightData?.flights?.departure?.airplane?.airplaneCode.substring(
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
                Baggage {flightData?.flights?.departure?.airplane?.baggage} Kg
              </div>
              <div>
                Cabin Baggage{" "}
                {flightData?.flights?.departure?.airplane?.cabinBaggage} Kg
              </div>
              <div>{flightData?.flights?.departure?.airplane?.description}</div>
            </div>
          </div>
        </div>

        <div className="arrivalFlightInformation mb-4">
          <div className="row">
            <div className="col-6 fw-bolder">
              {flightData?.flights?.departure?.arrivalDate
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
                flightData?.flights?.departure?.arrivalDate
              ).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="departureTerminal fw-semibold">
              {flightData?.flights?.departure?.departureAirport?.name ||
                "Unknown Terminal"}{" "}
              Airport
            </div>
          </div>
        </div>

        <div className="detailPrice row px-2 mb-4">
          <div className="col-12 fw-bolder">Rincian Harga</div>
          {Object.entries(
            flightData?.priceDetails?.passenger
              ?.filter((item) => item.flightType === "departure")
              .reduce((acc, item) => {
                if (acc[item.type]) {
                  acc[item.type].count += item.count;
                  acc[item.type].total += item.total;
                } else {
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

export default FlightDetail;
