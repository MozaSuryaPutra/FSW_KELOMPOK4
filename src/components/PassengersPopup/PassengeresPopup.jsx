import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChild, faBaby } from "@fortawesome/free-solid-svg-icons";

const PassengersPopup = ({ show, handleClose, onSelectCounts }) => {
  // State untuk menyimpan jumlah Dewasa, Anak, dan Bayi
  const [counts, setCounts] = useState({
    adult: 0,
    child: 0,
    baby: 0,
  });

  // Fungsi untuk mengatur jumlah berdasarkan tipe (dewasa, anak, bayi)
  const handleCountChange = (type, operation) => {
    setCounts((prevCounts) => {
      const newCount =
        operation === "increment"
          ? prevCounts[type] + 1
          : Math.max(0, prevCounts[type] - 1);
      return { ...prevCounts, [type]: newCount };
    });
  };

  // Mapping kategori ke ikon
  const categoryIcons = {
    adult: faUser,
    child: faChild,
    baby: faBaby,
  };

  // Mengirim data jumlah penumpang ke komponen parent
  const handleSave = () => {
    onSelectCounts(counts); // Kirim jumlah penumpang yang dipilih ke komponen parent
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Jumlah Penumpang</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pemilihan jumlah penumpang */}
        {["adult", "child", "baby"].map((type, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Ikon sesuai kategori */}
              <FontAwesomeIcon icon={categoryIcons[type]} size="lg" />
              <div>
                <div style={{ fontWeight: "bold" }}>
                  {type === "adult" && "Adult"}
                  {type === "child" && "Child"}
                  {type === "baby" && "Baby"}
                </div>
                <div style={{ fontSize: "0.9em", color: "gray" }}>
                  {type === "adult" && "(12 tahun ke atas)"}
                  {type === "child" && "(2 - 11 tahun)"}
                  {type === "baby" && "(Di bawah 2 tahun)"}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleCountChange(type, "decrement")}
                style={{
                  borderColor: "#7126B5",
                  height: "40px",
                  width: "40px",
                }}
              >
                -
              </Button>
              <span
                style={{
                  border: "1px solid #D0D0D0",
                  padding: "5px 15px",
                  borderRadius: "10px",
                  minWidth: "50px",
                  textAlign: "center",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {counts[type]}
              </span>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleCountChange(type, "increment")}
                style={{
                  borderColor: "#7126B5",
                  height: "40px",
                  width: "40px",
                }}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave} style={{ backgroundColor: "#4B1979" }}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PassengersPopup;
