import React from "react";
import Successimage from "../../../public/🦆 illustration _Cart shopping list_.png";
import "../payment/payment.css";
import { getTicket } from "../../services/ticket";
import { useLocation } from "@tanstack/react-router";
const paymentSuccess = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { transactionId } = location.state || {};
  return (
    <div>
      <div>
        <div className="container fw-bolder ">
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
        <div className="container text-center ">
          <img src={Successimage} alt="" />
        </div>

        <div className="text-center">
          <div className="fw-medium" style={{ color: "#7126B5" }}>
            Selamat!
          </div>
          <div className="fw-medium">Transaksi Pembayaran Tiket sukses!</div>
        </div>
        <div className="btn-get-ticket w-25  mx-auto">
          <div
            className="p-2 text-white text-center fw-semibold fs-6 border border-success-subtle rounded-3 mt-4"
            style={{ backgroundColor: "#7126B5" }}
            onClick={async () => {
              setLoading(true); // Set loading true saat proses dimulai
              try {
                const file = await getTicket(transactionId); // Mendapatkan file PDF
                if (file) {
                  toast.success("Berhasil cetak tiket!");
                  // Menangani pengunduhan atau menampilkan file PDF
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
                setLoading(false); // Set loading false setelah proses selesai
              }
            }}
          >
            Terbitkan Tiket
          </div>
        </div>
        <div className="btn-search-ticket w-25 mx-auto">
          <div
            className="p-2 text-white text-center fw-semibold fs-6 border border-success-subtle rounded-3 mt-2"
            style={{ backgroundColor: "#D0B7E6" }}
          >
            Cari Penerbangan Lain
          </div>
        </div>
      </div>
    </div>
  );
};

export default paymentSuccess;
