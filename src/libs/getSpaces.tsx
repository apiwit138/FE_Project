// libs/getSpaces.js
export default async function getSpaces() {
  // ดึง URL จาก .env.local ถ้าไม่มีให้สำรองเป็น localhost ไว้ก่อน
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const res = await fetch(`${API_URL}/api/v1/coworkingspaces`);

  if (!res.ok) {
    throw new Error('Failed to fetch coworking spaces');
  }

  return res.json();
}