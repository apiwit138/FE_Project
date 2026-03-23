"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// 🔹 Import ฟังก์ชันจาก libs มาใช้
import { createCoworkingSpace } from "@/libs/api"; 

export default function AddCoworkingSpacePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    telephoneNumber: "", // 👈 แก้ตรงนี้ให้ตรงกับ Backend
    openTime: "08:00",
    closeTime: "18:00",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // โหลดข้อมูล Session ยังไม่เสร็จ
  if (status === "loading") {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  // ดักทาง: ถ้าไม่ได้ล็อกอิน หรือไม่ใช่ Admin ให้ไล่กลับ
  if (!session || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (เฉพาะ Admin)</p>
        <Link href="/">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            กลับหน้าแรก
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔹 เรียกใช้ฟังก์ชันจาก libs แทนการ fetch ตรงๆ
      await createCoworkingSpace(session.user.token, formData);

      alert("🎉 เพิ่ม Coworking Space สำเร็จ!");
      router.push("/"); // กลับหน้าแรก
      router.refresh(); // สั่งให้หน้าแรกรีเฟรชข้อมูลใหม่

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Add New Space</h1>
          <Link href="/">
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              ✕ Cancel
            </button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g. The Hive Thonglor"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="123 Sukhumvit Road..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="02-XXX-XXXX"
              value={formData.telephoneNumber} // 👈 แก้ตรงนี้
              onChange={(e) => setFormData({ ...formData, telephoneNumber: e.target.value })} // 👈 แก้ตรงนี้
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Open Time</label>
              <input
                type="time"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.openTime}
                onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Close Time</label>
              <input
                type="time"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.closeTime}
                onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all mt-8
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 shadow-md"}`}
          >
            {loading ? "Saving..." : "Create Coworking Space"}
          </button>
        </form>
      </div>
    </main>
  );
}