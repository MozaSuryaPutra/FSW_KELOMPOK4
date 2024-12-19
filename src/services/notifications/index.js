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
    console.log(result)
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