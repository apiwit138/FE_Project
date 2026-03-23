export default async function userLogIn(
  email: string,
  password: string
) {
  // 🌐 ดึง URL จาก .env.local (ถ้าไม่มีให้ใช้ localhost สำรองไว้)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(
    `${API_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();

  console.log("STATUS:", res.status);
  console.log("DATA:", data); // 🔥 ดูตรงนี้

  if (!res.ok) return null;

  return data;
}