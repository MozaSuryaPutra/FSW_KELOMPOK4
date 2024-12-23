import React, { useState } from "react";
import Successimage from "../../../public/🦆 illustration _Cart shopping list_.png";
import "../payment/payment.css";
import { getTicket } from "../../services/ticket";
import { useLocation } from "@tanstack/react-router";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { transactionId } = location.state || {};

  const handleGetTicket = async () => {
    setLoading(true); // Mulai loading
    try {
      const file = await getTicket(transactionId); // Mendapatkan file PDF
      if (file) {
        toast.success("Berhasil cetak tiket!");
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = `ticket-${transactionId}.pdf`;
        link.click();
      } else {
        toast.error("Tiket tidak ditemukan.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengambil data tiket.");
      console.error(err);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  const handleSearchTicket = () => {
    navigate({ to: "/" }); // Navigasi ke halaman utama
  };

  return (
    <div>
      <div>
        <div className="container fw-bolder">
          <nav
            style={{ "--bs-breadcrumb-divider": "'>'" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Library
              </li>
            </ol>
          </nav>
        </div>
        <div className="container">
          <div
            className="p-3 text-white text-center fw-bolder fs-6 border border-success-subtle rounded-3"
            style={{ backgroundColor: "#73CA5C" }}
          >
            Terimakasih atas pembayaran transaksi
          </div>
        </div>
      </div>

      <div className="container vh-75 d-flex flex-column justify-content-center align-items-center">
        <div className="container text-center">
          <img src={Successimage} alt="Success Illustration" />
        </div>

        <div className="text-center">
          <div className="fw-medium" style={{ color: "#7126B5" }}>
            Selamat!
          </div>
          <div className="fw-medium">Transaksi Pembayaran Tiket sukses!</div>
        </div>

        <button
          className="btn-get-ticket w-25 mx-auto btn btn-primary mt-4"
          onClick={handleGetTicket}
          disabled={loading} // Disable tombol saat loading
        >
          {loading ? "Sedang Memproses..." : "Terbitkan Tiket"}
        </button>

        <button
          className="btn-search-ticket w-25 mx-auto btn btn-secondary mt-2"
          onClick={handleSearchTicket}
        >
          Cari Penerbangan Lain
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
