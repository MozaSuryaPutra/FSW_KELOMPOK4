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
  console.log(result); // Debugging log
  console.log(response);
  if (!response.ok) {
    throw new Error(result?.message);
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
  console.log(result); // Debugging log
  console.log(response);
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};

export const forgotPassword = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  let urlEncodedData = new URLSearchParams(request).toString();
    // Mengganti %40 kembali menjadi @ setelah URL encoding
    urlEncodedData = urlEncodedData.replace(/%40/g, '@');

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
  console.log(result); // Debugging log
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
  console.log(result); // Debugging log
  console.log(response);
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};

export const verifOTP = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(request).toString();
  console.log(urlEncodedData);

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
  console.log(result); // Debugging log
  console.log(response);
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};

export const resendOTP = async (userId) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(userId).toString();
  console.log("User Id: ",urlEncodedData);

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
  console.log(result); // Debugging log
  console.log(response);
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};
