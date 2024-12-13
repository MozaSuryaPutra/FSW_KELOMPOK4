export const chooseCheckout = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(request).toString();
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/checkout`, {
    body: urlEncodedData,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  console.log(result); // Debugging log
  console.log(response);
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const getCheckoutByID = async (userid, transactionid) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/api/checkout/${userid}/${transactionid}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  // console.log("ini reponse : ", response);
  // get data
  const result = await response.json();
  return result?.data;
};

export const updatePassanger = async (request) => {
  const token = localStorage.getItem("token");
  const urlEncodedData = new URLSearchParams(request).toString();
  if (!token) {
    console.error("Token tidak ditemukan");
    return;
  }

  let url = `${import.meta.env.VITE_API_URL}/api/checkout`;
  console.log(url);
  const response = await fetch(url, {
    body: urlEncodedData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    // body: formData,
  });

  // get the data if fetching succeed!
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};
