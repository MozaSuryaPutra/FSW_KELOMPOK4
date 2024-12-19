export const updateProfile = async (userId, request) => {
  // Menggunakan URLSearchParams untuk body URL-encoded
  const body = new URLSearchParams();
  body.append("name", request.name);
  body.append("numberPhone", request.numberPhone);
  body.append("email", request.email);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Sesuai dengan URL-encoded
      },
      method: "PUT",
      body, // Kirimkan URLSearchParams sebagai body
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};


export const getUserById = async (userId) => {
    let url = `${import.meta.env.VITE_API_URL}/api/users/${userId}`;
  
    const response = await fetch(url, {
      headers: {
      },
      method: "GET",
    });
  
    // get data
    const result = await response.json();
    console.log(result)
    if (!response.ok) {
      throw new Error(result?.message);
    }
  
    return result;
  };