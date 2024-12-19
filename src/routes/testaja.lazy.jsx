import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import SeatSelector from "../components/SeatSelector/SeatSelector";
import { useState } from "react";
import { useEffect } from "react";
import { updateCheckout } from "../services/checkout/checkout";
import { useMutation } from "@tanstack/react-query";
export const Route = createLazyFileRoute("/testaja")({
  component: testajasi,
});

function testajasi() {
  const [outboundSeatIds, setOutboundSeatIds] = useState([]);
  const [returnSeatIds, setReturnSeatIds] = useState([]);

  const seatData = [
    { id: 115, airplaneId: "9", code: "9A", status: "booked" },
    { id: 116, airplaneId: "9", code: "9B", status: "booked" },
    { id: 117, airplaneId: "9", code: "9C", status: "booked" },
    { id: 118, airplaneId: "9", code: "9D", status: "booked" },
    { id: 119, airplaneId: "9", code: "9E", status: "booked" },
    { id: 120, airplaneId: "9", code: "9F", status: "available" },
    { id: 121, airplaneId: "9", code: "9G", status: "booked" },
    { id: 122, airplaneId: "9", code: "9H", status: "booked" },
    { id: 123, airplaneId: "9", code: "9I", status: "available" },
    { id: 124, airplaneId: "9", code: "9J", status: "booked" },
    { id: 125, airplaneId: "9", code: "9K", status: "booked" },
    { id: 126, airplaneId: "9", code: "9L", status: "booked" },
  ];
  const ReturnSeatData = [
    { id: "103", airplaneId: "8", code: "8A", status: "available" },
    { id: "104", airplaneId: "8", code: "8B", status: "available" },
    { id: "105", airplaneId: "8", code: "8C", status: "booked" },
    { id: "106", airplaneId: "8", code: "8D", status: "available" },
    { id: "107", airplaneId: "8", code: "8E", status: "booked" },
    { id: "108", airplaneId: "8", code: "8F", status: "booked" },
    { id: "109", airplaneId: "8", code: "8G", status: "available" },
    { id: "110", airplaneId: "8", code: "8H", status: "booked" },
    { id: "111", airplaneId: "8", code: "8I", status: "available" },
    { id: "112", airplaneId: "8", code: "8J", status: "available" },
    { id: "113", airplaneId: "8", code: "8K", status: "available" },
    { id: "114", airplaneId: "8", code: "8L", status: "booked" },
  ];

  const [formData, setFormData] = useState({
    userId: 0,
    transactionId: 0,
    orderer: {
      fullname: "",
      familyName: "",
      numberPhone: "",
      email: "",
    },
    passengers: [],
    seatIds: [],
  });

  console.log(formData);
  const [passengerCount, setPassengerCount] = useState({
    adult: 1,
    child: 0,
    kids: 0,
  });

  useEffect(() => {
    const generatePassengers = () => {
      const newPassengers = [];
      for (let i = 0; i < passengerCount.adult; i++) {
        newPassengers.push({
          title: "",
          passengerType: "adult",
          fullname: "",
          familyName: "",
          birthDate: "",
          citizenship: "",
          identityNumber: "",
          publisherCountry: "",
          expiredAt: "",
        });
      }
      for (let i = 0; i < passengerCount.child; i++) {
        newPassengers.push({
          title: "",
          passengerType: "child",
          fullname: "",
          familyName: "",
          birthDate: "",
          citizenship: "",
          identityNumber: "",
          publisherCountry: "",
          expiredAt: "",
        });
      }
      setFormData((prev) => ({ ...prev, passengers: newPassengers }));
    };

    generatePassengers();
  }, [passengerCount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrdererChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      orderer: { ...prev.orderer, [name]: value },
    }));
  };

  const handlePassengerCountChange = (e) => {
    const { name, value } = e.target;
    setPassengerCount((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedPassengers = [...prev.passengers];
      updatedPassengers[index][name] = value;
      return { ...prev, passengers: updatedPassengers };
    });
  };

  const handleSeatSelection = (selectedSeats) => {
    setOutboundSeatIds(selectedSeats); // Untuk seat pergi
  };

  const handleSeatsSelection = (selectedSeats) => {
    setReturnSeatIds(selectedSeats); // Untuk seat kembali
  };
  const { mutate: updateCheckouts } = useMutation({
    mutationFn: (body) => {
      console.log("Login mutation called with body:", body); // Debugging log
      return updateCheckout(body);
    },
    onSuccess: (data) => {
      console.log("Data on success:", data); // Debugging log
      if (data) {
        console.log("Data on success:", data); // Debugging log
      } else {
        console.error("Token or user not found in response");
      }
    },
    onError: (err) => {
      console.error("Login error:", err.message);
      toast.error(err?.message);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      userId: parseInt(formData.userId, 10),
      transactionId: parseInt(formData.transactionId, 10),
      orderer: JSON.stringify(formData.orderer),
      passengers: JSON.stringify(formData.passengers),
      seatIds: JSON.stringify([...outboundSeatIds, ...returnSeatIds]), // Gabungkan seatIds dari pergi dan kembali
    };

    console.log("ini data : ", data);

    updateCheckouts(data);
  };

  return (
    <div>
      <h1>Seat Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID</label>
          <input type="text" name="userId" onChange={handleInputChange} />
        </div>
        <div>
          <label>Transaction ID</label>
          <input
            type="text"
            name="transactionId"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <h3>Orderer Info</h3>
          <input
            type="text"
            name="fullname"
            placeholder="Fullname"
            onChange={handleOrdererChange}
          />
          <input
            type="text"
            name="familyName"
            placeholder="Family Name"
            onChange={handleOrdererChange}
          />
          <input
            type="text"
            name="numberPhone"
            placeholder="Phone Number"
            onChange={handleOrdererChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleOrdererChange}
          />
        </div>

        <div>
          <h3>Passengers</h3>
          {formData.passengers.map((passenger, index) => (
            <div key={index}>
              <h1>
                {index + 1}. {passenger.passengerType}
              </h1>
              <select
                name="title"
                onChange={(e) => handlePassengerChange(index, e)}
              >
                <option value="">Select Title</option>
                {passenger?.passengerType === "child" ? (
                  <>
                    <option value="boy">Boy</option>
                    <option value="girl">Girl</option>
                  </>
                ) : (
                  <>
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                  </>
                )}
              </select>
              <input
                type="text"
                name="fullname"
                placeholder="Fullname"
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                type="text"
                name="familyName"
                placeholder="Family Name"
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                type="date"
                name="birthDate"
                placeholder="birthDate"
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                type="text"
                name="citizenship"
                placeholder="Citizenship"
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                type="text"
                name="identityNumber"
                placeholder="Identity Number"
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                type="text"
                name="publisherCountry"
                placeholder="publisher Country"
                onChange={(e) => handlePassengerChange(index, e)}
              />
              <input
                type="date"
                name="expiredAt"
                placeholder="Expired At"
                onChange={(e) => handlePassengerChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div>
          <h3>Select Seats</h3>
          <SeatSelector
            seats={seatData}
            passengerCount={passengerCount}
            onSeatSelect={handleSeatSelection}
          />
        </div>

        {ReturnSeatData.length > 0 && (
          <div>
            <h3>Select Return Seats</h3>
            <SeatSelector
              seats={ReturnSeatData}
              passengerCount={passengerCount}
              onSeatSelect={handleSeatsSelection}
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default testajasi;
