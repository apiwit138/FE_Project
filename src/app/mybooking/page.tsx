"use client";

import BookingList from "@/components/BookingList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyBookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔹 เช็คสถานะตลอดเวลา ถ้าไม่มี Session ให้ Alert แจ้งเตือนแล้วเด้งกลับหน้าแรก
  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Please login first"); // 👈 เพิ่ม Alert ตรงนี้ครับ
      router.push("/"); 
    }
  }, [status, router]);

  // 🔹 ระหว่างรอระบบตรวจสอบ Session ให้ขึ้น Loading ก่อน
  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <p className="text-lg font-medium text-gray-500">Loading your bookings...</p>
      </div>
    );
  }

  // 🔹 ถ้าไม่มี session แล้ว ให้ return null เพื่อไม่ให้เห็น Component BookingList
  if (!session) {
    return null; 
  }

  return (
    <main className="container mx-auto py-10 px-4 min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Venue Bookings
      </h1>
      
      {/* นำ Component BookingList มาวางไว้บนหน้านี้ */}
      <BookingList />
    </main>
  );
}