"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking, setBookings } from "@/redux/features/bookSlice";
import { Button, CircularProgress } from "@mui/material";
// ✅ อย่าลืม import API สำหรับ Check-in / Check-out มาด้วย
import { deleteReservation, getReservations, checkInReservation, checkOutReservation } from "@/libs/api";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import Link from "next/link"; 

import { BookingItem } from "../../interface";

export default function BookingList() {
  const bookingItems = useAppSelector((state: any) => state.bookSlice.bookItems) as BookingItem[];
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const token = session?.user?.token;
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await getReservations(token);
        const formatted: BookingItem[] = res.data.map((item: any) => ({
          _id: item._id,
          reservationDate: item.reservationDate,
          createdAt: item.createdAt,
          status: item.status,
          user: {
            _id: item.user?._id || (typeof item.user === "string" ? item.user : "unknown"),
            name: item.user?.name || session?.user?.name || "Member", 
          },
          coworkingSpace: {
            _id: item.coworkingSpace?._id || "unknown",
            name: item.coworkingSpace?.name || "Space D",
            address: item.coworkingSpace?.address || "N/A",
            telephoneNumber: item.coworkingSpace?.telephoneNumber || "N/A",
            openTime: item.coworkingSpace?.openTime || "N/A",
            closeTime: item.coworkingSpace?.closeTime || "N/A",
          },
        }));
        dispatch(setBookings(formatted));
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [token, dispatch, session]);

  const handleDelete = async (id: string) => {
    if (!token) return alert("Please login");
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await deleteReservation(token, id);
      dispatch(removeBooking(id));
      alert("Booking cancelled success 🔥");
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ✅ ฟังก์ชัน Check-in
  const handleCheckIn = async (id: string) => {
    if (!token) return;
    try {
      await checkInReservation(token, id); // เรียก API
      
      // อัปเดต Redux ให้สถานะเปลี่ยนเป็น CHECKED_IN ทันที
      const updatedItems = bookingItems.map((item) => 
        item._id === id ? { ...item, status: "CHECKED_IN" } : item
      );
      dispatch(setBookings(updatedItems));
      
      alert("Check-in success! 🎉");
    } catch (err: any) {
      alert(err.message || "Check-in failed");
    }
  };

  // ✅ ฟังก์ชัน Check-out
  const handleCheckOut = async (id: string) => {
    if (!token) return;
    try {
      await checkOutReservation(token, id); // เรียก API
      
      // อัปเดต Redux ให้สถานะเปลี่ยนเป็น COMPLETED ทันที
      const updatedItems = bookingItems.map((item) => 
        item._id === id ? { ...item, status: "COMPLETED" } : item
      );
      dispatch(setBookings(updatedItems));
      
      alert("Check-out success! 👋");
    } catch (err: any) {
      alert(err.message || "Check-out failed");
    }
  };

  // ✅ เพิ่มสีสำหรับสถานะ CHECKED_IN และรวม BOOKED ไว้กับ PENDING
  const statusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "text-green-600";
      case "CHECKED_IN": return "text-blue-600"; // ให้สีน้ำเงินดูโดดเด่นว่ากำลังใช้งานอยู่
      case "PENDING": 
      case "BOOKED": return "text-yellow-600";
      case "CANCELLED": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress />
      </div>
    );
  }

  if (!bookingItems || bookingItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No Booking. Let's make one!
      </div>
    );
  }

  return (
    <div className="space-y-4 p-5">
      {bookingItems.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2 border border-gray-100"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{item.coworkingSpace?.name}</h3>
            <span className={`font-bold ${statusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
          
          <div className="text-sm font-medium text-blue-600">
            👤 Booked by: {item.user?.name}
          </div>

          <div className="text-sm text-gray-600">
            🗓 Booking Date: {dayjs(item.reservationDate).format("DD MMM YYYY")}
          </div>
          <div className="text-sm text-gray-600">
            ⏰ Open: {item.coworkingSpace?.openTime} - {item.coworkingSpace?.closeTime}
          </div>
          <div className="text-xs text-gray-400">
            Created: {dayjs(item.createdAt).format("DD MMM YYYY")}
          </div>

         <div className="flex space-x-3 pt-2">
            
            {/* 📍 เงื่อนไขที่ 1: สถานะ BOOKED หรือ PENDING ให้โชว์ปุ่ม Check-in และ Edit Date */}
            {(item.status === "BOOKED" || item.status === "PENDING") && (
              <>
                <Button variant="contained" color="primary" size="small" onClick={() => handleCheckIn(item._id)}>
                  Check-in
                </Button>

                <Link href={`/booking/edit/${item._id}`} passHref>
                  <Button variant="outlined" color="success" size="small">
                    Edit Date
                  </Button>
                </Link>
              </>
            )}

            {/* 📍 เงื่อนไขที่ 2: สถานะ CHECKED_IN ให้โชว์ปุ่ม Check-out */}
            {item.status === "CHECKED_IN" && (
              <Button variant="contained" color="secondary" size="small" onClick={() => handleCheckOut(item._id)}>
                Check-out
              </Button>
            )}

            {/* ⭐ เงื่อนไขที่ 3: สถานะ COMPLETED (เช็คเอาท์แล้ว) ให้โชว์ปุ่ม Review */}
            {item.status === "COMPLETED" && (
              <Link href={`/review/create/${item._id}`} passHref>
                <Button variant="contained" color="info" size="small">
                  Review
                </Button>
              </Link>
            )}

            {/* 🗑 ปุ่ม Cancel / Delete: ดึงออกมาไว้นอกเงื่อนไข เพื่อให้แสดงตลอดเวลา */}
            <Button 
              variant="contained" 
              color="error" 
              size="small" 
              onClick={() => handleDelete(item._id)}
            >
              {/* เปลี่ยนคำอธิบายปุ่มอัตโนมัติ: ถ้า Checkout แล้วให้ขึ้นว่า Delete */}
              {item.status === "COMPLETED" ? "Delete" : "Cancel"}
            </Button>
            
          </div>
        </div>
      ))}
    </div>
  );
}