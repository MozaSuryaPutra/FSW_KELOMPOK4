export const getNotificationById = async (userId) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/api/notification/${userId}`;
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  console.log(result);
  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const updateNotification = async (notifId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/notification/${notifId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }
  return result;
};

export const createNotification = async (request) => {
  // Mengonversi request body menjadi URL-encoded string
  const urlEncodedData = new URLSearchParams(request).toString();
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/notification`,
    {
      body: urlEncodedData,
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
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

export const deleteNotification = async (notifId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/notification/${notifId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.message);
  }
  return result;
};
