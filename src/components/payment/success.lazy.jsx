import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useLocation } from "react-router-dom";
import PaymentSuccess from "../../components/payment/paymentsuccess";
import PaymentPending from "../../components/payment/paymentpanding";
import PaymentFailed from "../../components/payment/paymentfailed";

export const Route = createLazyFileRoute("/payment/success")({
  component: SuccessPage,
});

function SuccessPage() {
  const location = useLocation();
  const [transactionStatus, setTransactionStatus] = React.useState(null);

  React.useEffect(() => {
    // Mengambil parameter query dari URL
    const params = new URLSearchParams(location.search);
    const status = params.get("transaction_status"); // Mendapatkan nilai transaction_status
    setTransactionStatus(status); // Menyimpan nilai status ke dalam state
  }, [location]);

  // Menentukan tampilan berdasarkan status transaksi
  const renderContent = () => {
    if (transactionStatus === "settlement") {
      return <PaymentSuccess />; // Menampilkan komponen sukses
    } else if (transactionStatus === "pending") {
      return <PaymentPending />; // Menampilkan komponen pending
    } else if (transactionStatus === "failed") {
      return <PaymentFailed />; // Menampilkan komponen gagal
    } else {
      return (
        <div>
          <h2>Transaksi Tidak Dikenali</h2>
          <p>Status transaksi tidak ditemukan.</p>
        </div>
      );
    }
  };

  return <div className="finish-page">{renderContent()}</div>;
}
