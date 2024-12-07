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
