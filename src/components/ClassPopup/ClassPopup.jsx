import React, { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const ClassPopup = ({ show, handleClose, onSelectClass }) => {
  const [selectedClass, setSelectedClass] = useState("Economy");

  // Data untuk opsi kelas penerbangan
  const flightClasses = [{ name: "economy" }, { name: "business" }];
  // { name: "Economy", price: "IDR 4.950.000" },
  // { name: "Premium Economy", price: "IDR 7.550.000" },
  // { name: "Business", price: "IDR 29.220.000" },
  // { name: "First Class", price: "IDR 87.620.000" },
  const handleSave = () => {
    onSelectClass(selectedClass); // Kirim kelas yang dipilih ke komponen induk
    handleClose(); // Tutup modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <ListGroup>
          {flightClasses.map((flightClass) => (
            <ListGroup.Item
              key={flightClass.name}
              className={`d-flex justify-content-between align-items-center border-0 border-bottom ${
                selectedClass === flightClass.name ? "active" : ""
              }`}
              onClick={() => setSelectedClass(flightClass.name)}
              style={{
                borderRadius: 0,
                outline: "none",
                boxShadow: "none",
                cursor: "pointer",
                backgroundColor:
                  selectedClass === flightClass.name ? "#5E2D91" : "white",
                color: selectedClass === flightClass.name ? "white" : "black",
              }}
            >
              <div style={{ width: "70%" }}>
                <div>{flightClass.name}</div>
                <div style={{ fontSize: "0.85rem", color: "#777" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        selectedClass === flightClass.name
                          ? "white"
                          : "#7126B5",
                    }}
                  >
                    {flightClass.price}
                  </span>
                </div>
              </div>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{ width: "30%" }}
              >
                {selectedClass === flightClass.name && (
                  <Image src="./public/Vector (1).png" fluid />
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
        <Button
          style={{ backgroundColor: "#5E2D91", border: "none" }}
          onClick={handleSave}
        >
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClassPopup;
