// 🌐 ดึง URL จาก Environment Variable ก่อน (Vercel) ถ้าหาไม่เจอให้ใช้ Localhost (เครื่องตัวเอง)
const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const BASE_URL = `${API_DOMAIN}/api/v1`;

// 🔹 Helper สำหรับเช็ค Response (ช่วยให้โค้ดสั้นลงเยอะมาก!)
const handleResponse = async (res: Response) => {
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Something went wrong");
  }
  return result;
};

// ==========================================
// 🔐 AUTH API
// ==========================================

// 🔹 Register
export async function register(data: any) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// 🔹 Login
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

// 🔹 Logout
export async function logout() {
  const res = await fetch(`${BASE_URL}/auth/logout`);
  return handleResponse(res);
}

// 🔹 Get Me (Profile)
export async function getMe(token: string) {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// ==========================================
// 🏢 COWORKING SPACES API
// ==========================================

// 🔹 Get Coworking Spaces
export async function getSpaces() {
  const res = await fetch(`${BASE_URL}/coworkingspaces`);
  return handleResponse(res);
}

// ==========================================
// 📅 RESERVATIONS API
// ==========================================

// 🔹 Get ALL Reservations
export async function getReservations(token: string) {
  const res = await fetch(`${BASE_URL}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// 🔹 Get SINGLE Reservation
export async function getReservation(token: string, reservationId: string) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// 🔹 Create Reservation
export async function createReservation(token: string, spaceId: string, date: string) {
  const res = await fetch(`${BASE_URL}/coworkingspaces/${spaceId}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservationDate: date }),
  });
  return handleResponse(res);
}

// 🔹 Update Reservation
export async function updateReservation(token: string, reservationId: string, date: string) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservationDate: date }),
  });
  return handleResponse(res);
}

// 🔹 Delete Reservation
export async function deleteReservation(token: string, reservationId: string) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// 🔹 Check-in Reservation
export async function checkInReservation(token: string, reservationId: string) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}/checkin`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// 🔹 Check-out Reservation
export async function checkOutReservation(token: string, reservationId: string) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}/checkout`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// ==========================================
// 🌟 REVIEWS API
// ==========================================

// 🔹 Create Review
export async function createReview(token: string, reservationId: string, rating: number, comment: string) {
  const res = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservationId, rating, comment }),
  });
  return handleResponse(res);
}

// 🔹 Get ALL Reviews (ดูรีวิวทั้งหมด)
export async function getReviews() {
  const res = await fetch(`${BASE_URL}/reviews`);
  return handleResponse(res);
}

// 🔹 Get SINGLE Review by ID (ดูรีวิวอันเดียว)
export async function getReview(reviewId: string) {
  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`);
  return handleResponse(res);
}

// 🔹 Get Reviews by Coworking Space (ดูรีวิวเฉพาะของสถานที่นั้นๆ)
export async function getReviewsByCoworking(coworkingId: string) {
  const res = await fetch(`${BASE_URL}/reviews/coworking/${coworkingId}`);
  return handleResponse(res);
}

// 🔹 Update Review (แก้ไขรีวิว)
export async function updateReview(token: string, reviewId: string, rating: number, comment: string) {
  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating, comment }),
  });
  return handleResponse(res);
}

// 🔹 Delete Review (ลบรีวิว)
export async function deleteReview(token: string, reviewId: string) {
  const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

// 🔹 Create Coworking Space (Admin Only)
export async function createCoworkingSpace(token: string, data: any) {
  const res = await fetch(`${BASE_URL}/coworkingspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ส่ง Token Admin ไปยืนยันตัวตน
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}


// 🔹 Delete Coworking Space (Admin Only)
export async function deleteCoworkingSpace(token: string, spaceId: string) {
  const res = await fetch(`${BASE_URL}/coworkingspaces/${spaceId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}