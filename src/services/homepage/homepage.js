export const getCities = async () => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/api/cities`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const result = await response.json();
  return result?.data;
};

export const getSearchedFlight = async (
  departure,
  destination,
  departureDate,
  returnDate,
  passengers,
  seatClass
) => {
  const token = localStorage.getItem("token");
  let params = {};
  if (departure) {
    params.departure = departure.id;
  }
  if (destination) {
    params.destination = destination.id;
  }
  if (departureDate) {
    params.departureDate = departureDate;
  }
  if (passengers) {
    params.passengers = passengers;
  }
  if (seatClass) {
    params.seatClass = seatClass;
  }
  if (returnDate) {
    params.returnDate = returnDate;
  }

  let url =
    `${import.meta.env.VITE_API_URL}/api/flights/search?` +
    new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  if (!response.ok) {
    const errorResult = await response.json();
    throw new Error(errorResult?.message || "Terjadi kesalahan pada server.");
  }

  const result = await response.json();

  return result?.data;
};

export const getFavDestination = async (continent) => {
  const token = localStorage.getItem("token");
  let params = {};
  if (continent) {
    params.continent = continent;
  }

  let url =
    `${import.meta.env.VITE_API_URL}/api/flights/favorites?` +
    new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();

  return result?.data;
};

export const getContinents = async () => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/api/continents`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  const result = await response.json();
  return result?.data;
};
