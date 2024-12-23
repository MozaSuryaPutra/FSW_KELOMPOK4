import React, { useState } from "react";
import "react-multi-date-picker/styles/colors/purple.css";
import "react-multi-date-picker/styles/colors/green.css";
import { Calendar } from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

// Styled-components untuk mengganti warna hari-hari dalam minggu
const StyledCalendar = styled(Calendar)`
  .rmdp-week-day {
    color: #8a8a8a !important; /* Ganti warna hari-hari dalam minggu */
  }
`;

const OneDatePopup = ({ show, handleClose, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date.format("YYYY-MM-DD")); // Mengembalikan tanggal dalam format penyimpanan (YYYY-MM-DD)
    handleClose(); // Tutup modal setelah memilih tanggal
  };

  const today = new DateObject(); // Mendapatkan tanggal hari ini


  return (
    <Modal
      value={selectedDate}
      onChange={handleDateChange}
      show={show}
      onHide={handleClose}
      centered
      className="d-flex justify-content-center align-items-center"
    >
      <StyledCalendar
        color="purple"
        value={selectedDate}
        onChange={handleDateChange}
        minDate={today}
      />
    </Modal>
  );
};

export default OneDatePopup;
