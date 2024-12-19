export const createPayment = async (request) => {
  const token = localStorage.getItem("token");
  const urlEncodedData = new URLSearchParams(request).toString();
  if (!token) {
    console.error("Token tidak ditemukan");
    return;
  }

  let url = `${import.meta.env.VITE_API_URL}/api/checkout/payment`;
  console.log(url);
  const response = await fetch(url, {
    body: urlEncodedData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    // body: formData,
  });

  // get the data if fetching succeed!
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};
