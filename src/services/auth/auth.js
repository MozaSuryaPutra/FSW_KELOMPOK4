export const login = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(request).toString();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      body: urlEncodedData,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    // Tambahkan properti `details` ke Error untuk menyimpan detail error
    const error = new Error(result.message || "An error occurred.");
    error.details = result.details; // Tambahkan array `details` dari respons
    throw error;
  }

  return result;
};

export const register = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(request).toString();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
    {
      body: urlEncodedData,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    // Tambahkan properti `details` ke Error untuk menyimpan detail error
    const error = new Error(result.message || "An error occurred.");
    error.details = result.details; // Tambahkan array `details` dari respons
    throw error;
  }

  return result;
};

export const forgotPassword = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  let urlEncodedData = new URLSearchParams(request).toString();
  // Mengganti %40 kembali menjadi @ setelah URL encoding
  urlEncodedData = urlEncodedData.replace(/%40/g, "@");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
    {
      body: urlEncodedData,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};

export const resetPassword = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(request).toString();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
    {
      body: urlEncodedData,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};

export const verifOTP = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(request).toString();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
    {
      body: urlEncodedData,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};

export const resendOTP = async (userId) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(userId).toString();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/reset-otp`,
    {
      body: urlEncodedData,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};
