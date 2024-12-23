import React, { useState } from "react";
import "./SeatSelector.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const SeatSelector = ({
  seats,
  passengerCount,
  onSeatSelect,
  classs,
  details,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [classChoosen] = useState(`${classs}`);
  // Total kursi yang diperbolehkan untuk dipilih
  const maxSeats = passengerCount?.adult + passengerCount?.child;
  const availableSeatsCount = seats.filter(
    (seat) => seat.status === "available"
  ).length;
  const handleSeatClick = (seatId) => {
    // Jika kursi yang dipilih sudah dalam daftar, hapus dari pilihan
    if (selectedSeats.includes(seatId)) {
      const updatedSeats = selectedSeats.filter((id) => id !== seatId);
      setSelectedSeats(updatedSeats);
      onSeatSelect(updatedSeats); // Mengirimkan data yang sudah diupdate ke parent
    } else {
      // Jika jumlah kursi yang dipilih belum mencapai batas, tambahkan
      if (selectedSeats.length < maxSeats) {
        const updatedSeats = [...selectedSeats, seatId];
        setSelectedSeats(updatedSeats);
        onSeatSelect(updatedSeats); // Mengirimkan data yang sudah diupdate ke parent
      } else {
        alert(`Maksimal ${maxSeats} kursi dapat dipilih.`);
      }
    }
  };

  return (
    <>
      <div className="">
        <Card
          style={{
            padding: "15px",
            border: "1px #3C3C3C solid",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Card.Title style={{ marginBottom: "30px", fontWeight: "700" }}>
            Pilih Kursi
          </Card.Title>
          <Card.Subtitle
            className="mb-3 text-white text-center"
            style={{
              backgroundColor: "#73CA5C",
              borderRadius: "4px 4px 1px 1px",
              padding: "10px 15px",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            {classChoosen} - {availableSeatsCount} Seats Available
          </Card.Subtitle>
          <Card.Body>
            <div className="seat-grid">
              {seats
                .sort((a, b) => a.id - b.id) // Urutkan berdasarkan ID dari yang terkecil
                .map((seat, index) => {
                  const rowIndex = Math.floor(index / 6); // Menentukan baris kursi
                  const isLeftSide = index % 6 < 3; // Menentukan apakah kursi berada di sisi kiri (0-2)

                  // Jika sudah ada separator setelah 3 kursi
                  const isSeparator = index % 6 === 3;

                  return (
                    <>
                      {/* Menampilkan separator setiap 3 kursi */}
                      {isSeparator && (
                        <div
                          className="separator"
                          key={`separator-${rowIndex}`}
                        >
                          {rowIndex + 1}
                        </div>
                      )}

                      <div
                        key={seat.id}
                        className={`seat ${
                          seat.status === "booked"
                            ? "booked"
                            : selectedSeats.includes(seat.id)
                              ? "selected"
                              : "available"
                        } ${isLeftSide ? "left-side" : "right-side"}`}
                        onClick={() =>
                          seat.status === "available" &&
                          handleSeatClick(seat.id)
                        }
                      >
                        {/* Tampilkan nomor kursi atau posisi penumpang */}
                        {details?.flights?.return ? (
                          details?.passengers
                            ?.map((passenger) => passenger.seatId)
                            .includes(seat.id) ? (
                            <span
                              style={{
                                backgroundColor: "purple",
                                color: "white",
                                padding: "0.2em 0.5em",
                                borderRadius: "5px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                              }}
                            >
                              P
                              {(() => {
                                const passengers = details.passengers;

                                // Cari indeks dari seatId
                                const currentPassengerIndex =
                                  passengers.findIndex(
                                    (passenger) => passenger.seatId === seat.id
                                  );

                                if (currentPassengerIndex === -1) {
                                  return ""; // Jika tidak ditemukan
                                }

                                // Hitung nomor kursi berdasarkan pasangan indeks
                                return (
                                  Math.floor(currentPassengerIndex / 2) + 1
                                );
                              })()}
                            </span>
                          ) : selectedSeats.includes(seat.id) ? (
                            `P${selectedSeats.indexOf(seat.id) + 1}`
                          ) : (
                            seat.code
                          )
                        ) : details?.passengers
                            ?.map((passenger) => passenger.seatId)
                            .includes(seat.id) ? (
                          <span
                            style={{
                              backgroundColor: "purple",
                              color: "white",
                              padding: "0.2em 0.5em",
                              borderRadius: "5px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                            }}
                          >
                            P
                            {(() => {
                              const passengers = details.passengers;

                              // Cari indeks dari seatId
                              const currentPassengerIndex =
                                passengers.findIndex(
                                  (passenger) => passenger.seatId === seat.id
                                );

                              if (currentPassengerIndex === -1) {
                                return ""; // Jika tidak ditemukan
                              }

                              // Hitung nomor kursi berdasarkan indeks langsung
                              return currentPassengerIndex + 1;
                            })()}
                          </span>
                        ) : selectedSeats.includes(seat.id) ? (
                          `P${selectedSeats.indexOf(seat.id) + 1}`
                        ) : (
                          seat.code
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SeatSelector;
