import React from "react";
import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import Countdown from "react-countdown";

export const Route = createLazyFileRoute("/auth/otp")({
  component: OTPInputUI,
});

function OTPInputUI() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(60);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpVerification = async () => {
    if (!otp) {
      alert("OTP is required");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/otp/verify`,
        { otp, token }
      );
      alert("OTP verified successfully");
      navigate("/success");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/otp/resend`, { token })
      .then(() => {
        alert("OTP resent successfully");
        setCounter(60);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Failed to resend OTP");
      });
  };

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
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Masukkan OTP</h1>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Ketik 6 digit kode yang dikirimkan ke <b>Email Anda</b>
      </p>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={handleChange}
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
      </div>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Kirim Ulang OTP dalam {counter} detik
      </p>
      <button
        onClick={handleOtpVerification}
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
        disabled={isLoading}
      >
        Verifikasi
      </button>
      <button
        onClick={handleResendOtp}
        style={{
          backgroundColor: "#ccc",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        disabled={counter > 0 || isLoading}
      >
        Kirim Ulang OTP
      </button>
    </div>
  );
}
