export const getOrderHistoryById = async (userId) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/api/history/${userId}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result?.data;
};
