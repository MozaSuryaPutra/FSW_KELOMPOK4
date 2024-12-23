import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Calendar } from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import styled from "styled-components";

// Styled-components untuk mengganti warna hari-hari dalam minggu
const StyledCalendar = styled(Calendar)`
  .rmdp-week-day {
    color: #8a8a8a !important; /* Ganti warna hari-hari dalam minggu */
  }
  .rmdp {
  }
`;

const DatePopup = ({ show, handleClose, onSelectDates }) => {
  const [values, setValues] = useState([
    new DateObject().setDay().subtract(1, "month"),
    new DateObject().setDay().add(1, "month"),
  ]);

  const handleDateChange = (value) => {
    setValues(value); // Update state values with selected dates
    if (onSelectDates) {
      onSelectDates(value); // Call the onSelectDates function passed from parent
    }
  };

    const today = new DateObject(); // Mendapatkan tanggal hari ini

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div style={{ width: "100%", maxWidth: "100vw", overflowX: "auto" }}>
        <StyledCalendar
          color="purple"
          value={values}
          onChange={handleDateChange}
          minDate={today}
          range
          numberOfMonths={2}
          showOtherDays
        />
      </div>
    </Modal>
  );
};

export default DatePopup;
