import React, { useState, useEffect } from "react";
import planeLogo from "../../../public/plane-logo-Image.png";

const flightDetail = (details) => {
  // const [flightData, setFlightData] = useState(null);

  // useEffect(() => {
  //   setFlightData(data);
  // }, []);

  console.log("ini detail:", details);

  return (
    <div className=" departureFlight">
      <div className="departureFlightInformation border-bottom border-dark-subtle pb-2">
        <div className="row">
          <div className="col-6 fw-bolder">
            {details.data.flights.departure.departureDate
              .toString()
              .substring(11, 16)}
          </div>
          <div
            className="col-6 text-end fw-semibold"
            style={{ color: "#A06ECE" }}
          >
            Keberangkatan
          </div>
          <div className="departureDate simpleText">
            {" "}
            {new Date(
              details.data.flights.departure.departureDate
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="departureTerminal fw-semibold"></div>
        </div>
      </div>

      <div className="departureInformation border-bottom border-dark-subtle pb-2">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            <div className="planeClass fw-bolder">
              {details.data.flights.departure.airplane.airline.name} -
              {details.data.flights.departure.departureTerminal.name}{" "}
              {details.data.flights.departure.class}
            </div>
            <div className="plateType fw-bolder">
              {details.data.flights.departure.airplane.airplaneCode}
            </div>
          </div>
        </div>

        <div className="row pt-2">
          <div className="col-1">
            <img src={details.data.flights.departure.airplane.airline.logo} />
          </div>
          <div className="col-11">
            <div className="fw-bolder">Informasi :</div>
            <div>
              Baggage {details.data.flights.departure.airplane.baggage}kg
            </div>
            <div>
              Cabin baggage{" "}
              {details.data.flights.departure.airplane.cabinBaggage}kg
            </div>
            <div>In Flight Entertaiment</div>
          </div>
        </div>
      </div>

      <div className="arrivaFlightInformation border-bottom border-dark-subtle pb-2">
        <div className="row">
          <div className="col-6 fw-bolder">
            {" "}
            {details.data.flights.departure.arrivalTime
              .toString()
              .substring(11, 16)}
          </div>
          <div
            className="col-6  text-end fw-semibold"
            style={{ color: "#A06ECE" }}
          >
            Kedatangan
          </div>
          <div className="departureDate">
            {" "}
            {new Date(
              details.data.flights.departure.arrivalDate
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="departureTerminal fw-semibold">
            {details.data.flights.departure.departureAirport.name} airport
          </div>
        </div>
      </div>

      <div className="detailPrice row px-2 border-bottom border-dark-subtle pb-2">
        <div className="col-12 fw-bolder">Rincian Harga</div>
        <div className="col-6">
          {details.data.priceDetails.passenger[0].count}{" "}
          {details.data.priceDetails.passenger[0].type}
        </div>
        <div className="col-6  text-end">
          IDR {details.data.priceDetails.passenger[0].total}
        </div>
        <div className="col-6">
          {details.data.priceDetails.passenger[1].count}{" "}
          {details.data.priceDetails.passenger[1].type}
        </div>
        <div className="col-6  text-end">
          IDR {details.data.priceDetails.passenger[1].total}
        </div>
        <div className="col-6">Tax</div>
        <div className="col-6  text-end">
          IDR {details.data.priceDetails.tax}
        </div>
      </div>

      <div className="detailPrice row px-2 pt-3">
        <div className="col-6 fw-bolder fs-5">Total</div>
        <div
          className="col-6 fw-bolder fs-5 text-end "
          style={{ color: "#7126B5" }}
        >
          IDR {details.data.priceDetails.totalPayAfterTax}
        </div>
      </div>
    </div>
  );
};

export default flightDetail;
