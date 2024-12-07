  export const getOrderHistoryById = async (id) => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/history/detail/${id}`;
  
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