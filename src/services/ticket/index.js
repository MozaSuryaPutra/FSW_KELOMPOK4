import axios from "axios";

export const getTicket = async (transactionId) => {
  const token = localStorage.getItem("token");

  // URL API untuk mengambil tiket
  let url = `${import.meta.env.VITE_API_URL}/api/tickets/${transactionId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      responseType: "blob", // Agar response berupa file binari
    });

    if (response.status === 200) {
      return response.data; // Mengembalikan Blob file PDF
    } else {
      throw new Error("Tiket tidak ditemukan.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Terjadi kesalahan saat mengambil tiket.");
  }
};
