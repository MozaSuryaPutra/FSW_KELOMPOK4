import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import BgTiketkuImage from "../../../public/BG-Tiketku.png";
import { OtpInput } from "reactjs-otp-input";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import axios from 'axios'
import Countdown from 'react-countdown'
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/auth/otp")({
  component: OTPInputUI,
});

function OTPInputUI() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState('');
  const { user, email } = useSelector((state) => state.auth);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(60);

  const { mutate: verifOTP } = useMutation({
    mutationFn: (data) => {
        setIsLoading(true);
        const toastId = toast.loading("Sending OTP...",{position:"bottom-center", className:""});
        axios
            .post(`${import.meta.env.VITE_API_URL}/auth/otp/verify`, data)
            .then((res) => {
                console.log(res);
                toast.update(toastId, {
                    render: "Verification Success",
                    type: "success",
                    autoClose: 3000,
                    isLoading:false,
                });
                navigate({ to: "/login" });
            })
            .catch((err) => {
                console.log(err);
                toast.update(toastId, {
                    render: (<span className="text-red-500 font-bold">OTP invalid</span>),
                    type: "error",
                    autoClose: 3000,
                    isLoading:false,
                });
            })
            .finally(() => setIsLoading(false));
    },
  });

  const handleChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const body = {
      email: user?.email,
      otp,
    };
    console.log(body);
    // hit the login API with the data
    verifOTP(body);
  };

  const handleOtpVerification = async () => {
    if (!otp || !token) {
      alert('OTP are required');
      return;
    }
    setIsLoading(true);
    try {
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { otp, token }
      );
      alert('OTP verified successfully');
      navigate('/success');
    } catch (err) {
      console.error(err); // Logging for debugging
      alert(err?.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    verifOTP(email);
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
    <form
      onSubmit={onSubmit}
      className="flex w-1/2 flex-col gap-12 items-center text-center"
    >
    </form>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Masukkan OTP</h1>
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        Ketik 6 digit kode yang dikirimkan ke {" "} <b>{user?.email}</b>
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
          onChange={(value) => {
            setOtp(value);
          }}
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
      <div style={{ marginTop: "20px", color: "red", cursor: "pointer" }} onClick={handleResendOtp}>
        Kirim ulang OTP
      </div>
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
        Simpan
      </button>
    </div>
  );
}

