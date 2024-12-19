import { useState, useEffect } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { OtpInput } from "reactjs-otp-input";
import { useNavigate } from "@tanstack/react-router";
import { verifOTP, resendOTP } from "../../services/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/auth/otp")({
  component: OTPInputUI,
});

function OTPInputUI() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(60);
  const userId = useSelector((state) => state.auth.user?.id);
  const userEmail = useSelector((state) => state.auth.user?.email);

  const { mutate: VerifikasiOTP } = useMutation({
    mutationFn: (otp) => verifOTP(otp),
    onSuccess: () => {
      toast.success("OTP berhasil diverifikasi!");
      navigate({ to: "/auth/login" }); // Redirect after success
    },
    onError: (error) => {
      toast.error(error?.message || "Verifikasi OTP gagal");
    },
  });

  const { mutate: ResendOtp, isPending: isResending } = useMutation({
    mutationFn: (userId) => resendOTP(userId), // Pastikan userId diteruskan
    onSuccess: () => {
      setCounter(60); // Reset countdown ketika OTP dikirim ulang
      toast.success("OTP baru telah dikirim!");
    },
    onError: (error) => {
      toast.error(error?.message || "Gagal mengirim OTP");
    },
  });

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
      return () => clearInterval(timer); // Cleanup timer when component unmounts
    }
  }, [counter]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!otp) {
      toast.error("OTP diperlukan");
      return;
    }

    setIsLoading(true);

    const body = {
      userId,
      otp,
    };

    console.log(body);
    // Call mutation to verify OTP
    VerifikasiOTP(body);
    setIsLoading(false);
  };

  const handleResendOtp = () => {
    // Trigger resend OTP mutation
    const request = {
      userId: userId,
    };
    ResendOtp(request);
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
        Ketik 6 digit kode yang dikirimkan ke <b>{userEmail}</b>
      </p>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <OtpInput
          value={otp}
          onChange={(value) => setOtp(value)}
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

      {counter === 0 && (
        <div
          style={{ marginTop: "20px", color: "red", cursor: "pointer" }}
          onClick={handleResendOtp}
        >
          Kirim ulang OTP
        </div>
      )}

      <button
        type="submit"
        onClick={onSubmit}
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
        disabled={isLoading || isResending}
      >
        {isLoading || isResending ? "Memproses..." : "Verifikasi OTP"}
      </button>
    </div>
  );
}
