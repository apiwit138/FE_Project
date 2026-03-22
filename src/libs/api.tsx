const BASE_URL = "http://localhost:5000/api/v1";

// 🔹 Register
export async function register(data: any) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔹 Login
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// 🔹 Logout
export async function logout() {
  const res = await fetch(`${BASE_URL}/auth/logout`);
  return res.json();
}

// 🔹 Get Coworking Spaces
export async function getSpaces() {
  const res = await fetch(`${BASE_URL}/coworkingspaces`);
  return res.json();
}

// 🔹 Get Reservations
export async function getReservations(token: string) {
  const res = await fetch(`${BASE_URL}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// 🔹 Create Reservation
export async function createReservation(
  token: string,
  spaceId: string,
  date: string
) {
  const res = await fetch(
    `${BASE_URL}/coworkingspaces/${spaceId}/reservations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reservationDate: date }),
    }
  );
  return res.json();
}

// 🔹 Update Reservation
export async function updateReservation(
  token: string,
  reservationId: string,
  date: string
) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservationDate: date }),
  });
  return res.json();
}

// 🔹 Delete Reservation
export async function deleteReservation(
  token: string,
  reservationId: string
) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}


export async function getMe(token: string) {
  const res = await fetch("http://localhost:5000/api/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}