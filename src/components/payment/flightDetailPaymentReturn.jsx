import React from "react";
import planeLogo from "../../../public/plane-logo-Image.png";

const FlightDetailReturnPayment = (details) => {
  return (
    <div className="departureFlight p-4 bg-light rounded-3 shadow-sm">
      {/* Departure Flight Information */}
      <div className="departureFlightInformation border-bottom border-secondary pb-3 mb-4">
        <div className="row">
          <div className="col-6 fw-bold fs-5 text-primary">
            {details.data.flights.return.departureDate
              .toString()
              .substring(11, 16)}
          </div>
          <div className="col-6 text-end fw-semibold text-muted">
            Keberangkatan
          </div>
          <div className="departureDate text-secondary fs-6">
            {new Date(
              details.data.flights.return.departureDate
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Departure Information */}
      <div className="departureInformation border-bottom border-secondary pb-3 mb-4">
        <div className="row">
          <div className="col-1">
            <img
              className="logo-img"
              style={{ width: "30px", height: "30px" }}
              src={details.data.flights.return.airplane.airline.logo}
              alt="airline logo"
            />
          </div>
          <div className="col-11">
            <div className="planeClass fw-bold text-dark">
              {details.data.flights.return.airplane.airline.name || " "} -{" "}
              {details.data.flights.return.departureTerminal.name || " "}{" "}
              {details.data.flights.return.class}
            </div>
            <div className="plateType text-muted">
              {details.data.flights.return.airplane.airplaneCode}
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="row pt-2">
          <div className="col-12 text-dark">
            <div className="fw-semibold">Informasi:</div>
            <div>Baggage {details.data.flights.return.airplane.baggage} kg</div>
            <div>
              Cabin Baggage {details.data.flights.return.airplane.cabinBaggage}{" "}
              kg
            </div>
            <div>In-Flight Entertainment</div>
          </div>
        </div>
      </div>

      {/* Arrival Flight Information */}
      <div className="arrivaFlightInformation border-bottom border-secondary pb-3 mb-4">
        <div className="row">
          <div className="col-6 fw-bold text-primary">
            {details.data.flights.return.arrivalTime
              .toString()
              .substring(11, 16)}
          </div>
          <div className="col-6 text-end fw-semibold text-muted">
            Kedatangan
          </div>
          <div className="departureDate text-secondary fs-6">
            {new Date(
              details.data.flights.return.arrivalDate
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="departureTerminal fw-semibold text-muted">
            {details.data.flights.return.departureAirport.name} Airport
          </div>
        </div>
      </div>

      {/* Price Details */}
      <div className="detailPrice row px-3 mb-4">
        <div className="col-12 fw-bold fs-5 text-dark">Rincian Harga</div>
        {Object.entries(
          details.data.priceDetails.passenger
            ?.filter((item) => item.flightType === "return")
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
        <div className="col-6 text-dark">Tax</div>
        <div className="col-6 text-end text-muted">
          IDR {details.data.priceDetails.tax.toLocaleString("id-ID") || 0}
        </div>
      </div>

      {/* Total Price */}
      <div className="detailPrice row px-3 pt-3">
        <div className="col-6 fw-bold fs-5">Total</div>
        <div
          className="col-6 fw-bold fs-5 text-end text-primary"
          style={{ color: "#7126B5" }}
        >
          IDR{" "}
          {details.data.priceDetails.totalPayAfterTax.toLocaleString("id-ID")}
        </div>
      </div>
    </div>
  );
};

export default FlightDetailReturnPayment;
