import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
//import TiketkuImage from "../../assets/img/Logo-Tiketku.png";
import { OtpInput } from "reactjs-otp-input";
export const Route = createLazyFileRoute("/auth/otp")({
  component: OTPInputUI,
});

function OTPInputUI() {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const handleChange = (otp) => setOtp(otp);
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "768px",
        margin: "0 auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <img
            src="Logo-Tiketku.png"
            alt="Tiketku"
            style={{ height: "120x" }}
          />
        </div>
      </header>

      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Masukkan OTP</h1>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Ketik 6 digit kode yang dikirimkan ke <b>J*****@gmail.com</b>
      </p>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        {/* {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="number"
            max={9}
            min={0}
            maxLength="1"
            style={{
              width: "40px",
              height: "40px",
              margin: "0 5px",
              fontSize: "20px",
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ))} */}
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span> </span>}
          inputStyle={{
            width: "40px",
            height: "40px",
            margin: "0 5px",
            fontSize: "20px",
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#666",
        }}
      >
        Kirim Ulang OTP dalam {counter} detik
      </p>

      <button
        style={{
          backgroundColor: "#6C63FF",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Simpan
      </button>
    </div>
  );
}

export default OTPInputUI;
