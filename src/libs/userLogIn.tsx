export default async function userLogIn(
  email: string,
  password: string
) {
  const res = await fetch(
    "http://localhost:5000/api/v1/auth/login",
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