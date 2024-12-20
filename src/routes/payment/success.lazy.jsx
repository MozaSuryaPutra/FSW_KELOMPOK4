import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import PaymentSuccess from "../../components/payment/paymentsuccess";
// import PaymentPending from "../../components/payment/paymentpanding";
// import PaymentFailed from "../../components/payment/paymentfailed";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mendapatkan query parameters dari URL
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order_id");
  const statusCode = params.get("status_code");
  const transactionStatus = params.get("transaction_status");

  // Menangani status transaksi
  useEffect(() => {
    if (transactionStatus === "settlement") {
      // Jika transaksi berhasil, arahkan ke halaman sukses
      navigate("/payment/finish");
    } else if (transactionStatus === "pending") {
      // Jika transaksi pending, arahkan ke halaman pending
      navigate("/payment/pending");
    } else if (transactionStatus === "failed") {
      // Jika transaksi gagal, arahkan ke halaman gagal
      navigate("/payment/failed");
    } else {
      // Handle status lainnya jika diperlukan
      console.log("Unhandled transaction status:", transactionStatus);
    }
  }, [transactionStatus, navigate]);

  return (
    <div>
      <h1>Status Pembayaran</h1>
      <p>Order ID: {orderId}</p>
      <p>Status Code: {statusCode}</p>
      <p>Transaction Status: {transactionStatus}</p>
    </div>
  );
}

export default PaymentSuccess;
