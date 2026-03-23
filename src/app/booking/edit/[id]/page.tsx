"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { getReservation, updateReservation } from "@/libs/api";

export default function EditBookingPage() {
  const params = useParams();
  const router = useRouter();
  
  // ✅ ดึง status มาด้วย เพื่อเช็คว่า session โหลดเสร็จหรือยัง
  const { data: session, status } = useSession(); 
  
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [venueName, setVenueName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const bookingId = params.id as string;
  const token = session?.user?.token;

  // โหลดข้อมูลการจองเดิมมาแสดง
  useEffect(() => {
    // ✅ ถ้าระบบ Auth ยังโหลดไม่เสร็จ ให้รอไปก่อน (อย่าเพิ่งรันโค้ดข้างล่าง)
    if (status === "loading") return;

    const fetchBooking = async () => {
      // ✅ ถ้าโหลด Auth เสร็จแล้วแต่ไม่มี token (ไม่ได้ล็อกอิน) หรือไม่มี ID ให้หยุดโหลด
      if (!token || !bookingId) {
        setLoading(false);
        // อาจจะเด้งกลับหน้า login ได้ด้วยถ้าต้องการ เช่น router.push("/api/auth/signin")
        return; 
      }

      try {
        const res = await getReservation(token, bookingId);
        setVenueName(res.data.coworkingSpace?.name || "Venue");
        setBookDate(dayjs(res.data.reservationDate));
      } catch (err) {
        console.error(err);
        alert("Could not load booking data");
      } finally {
        setLoading(false); // ✅ ตอนนี้บรรทัดนี้จะได้ทำงานอย่างแน่นอน
      }
    };

    fetchBooking();
  }, [token, bookingId, status]); // ✅ เพิ่ม status เข้าไปใน Dependency Array

  const handleUpdate = async () => {
    if (!bookDate) return alert("Please select a date");
    if (!token) return alert("Please login first");

    setSubmitting(true);
    try {
      await updateReservation(token, bookingId, bookDate.format("YYYY-MM-DD"));
      alert("Update Success! 🔥");
      router.push("/mybooking"); // หรือ path ของหน้า BookingList ของคุณ
      router.refresh(); 
    } catch (err) {
      alert("Update Failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center mt-20">
      <CircularProgress />
    </div>
  );

  return (
    <main className="w-full flex flex-col items-center space-y-6 pt-10">
      <div className="text-2xl font-semibold text-gray-800">Edit Your Booking</div>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-[90%] max-w-md space-y-5">
        <div className="text-center border-b pb-4">
            <p className="text-gray-500 text-sm">Venue</p>
            <p className="text-lg font-bold text-blue-600">{venueName}</p>
        </div>

        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">New Booking Date</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="DD/MM/YYYY"
                value={bookDate}
                onChange={(newValue) => setBookDate(newValue)}
                slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
              />
            </LocalizationProvider>
        </div>

        <div className="flex space-x-3 pt-4">
            <Button
                variant="outlined"
                fullWidth
                onClick={() => router.back()}
                disabled={submitting}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleUpdate}
                disabled={submitting}
            >
                {submitting ? "Saving..." : "Save Changes"}
            </Button>
        </div>
      </div>
    </main>
  );
}