"use client";

import { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
// สมมติว่ามีฟังก์ชัน getSpaces หรือ getCoworkingSpaces ใน api.ts เพื่อดึงข้อมูลทั้งหมด
import { createReservation, getSpaces } from "@/libs/api"; 
import { useSession } from "next-auth/react";

// กำหนด Type ให้กับ Space (ปรับเปลี่ยนให้ตรงกับข้อมูลที่ API ส่งมา)
interface Space {
  _id: string; // หรือ id
  name: string;
}

export default function Reservations() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [spaceId, setSpaceId] = useState(""); 
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [loadingSpaces, setLoadingSpaces] = useState(true);

  const { data: session } = useSession();
  const token = session?.user?.token;

  // ดึงข้อมูล Space ทั้งหมดเมื่อโหลด Component
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await getSpaces();
        // ปรับตรงนี้ให้ตรงกับโครงสร้างข้อมูลจริง เช่น data.data หรือ data
        const spaceList = data.data || data; 
        
        setSpaces(spaceList);
        
        // ตั้งค่า Default ให้เป็น Space แรกหากมีข้อมูล
        if (spaceList.length > 0) {
          setSpaceId(spaceList[0]._id);
        }
      } catch (err) {
        console.error("Error fetching spaces:", err);
      } finally {
        setLoadingSpaces(false);
      }
    };

    fetchSpaces();
  }, []);

  const handleBookVenue = async () => {
    if (!spaceId) {
      alert("Please select a venue");
      return;
    }

    if (!bookDate) {
      alert("Please select date");
      return;
    }

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await createReservation(
        token,
        spaceId,
        bookDate.format("YYYY-MM-DD")
      );

      alert("Booking success 🔥");
    } catch (err: any) {
      // ✅ ดึง err.message ที่ส่งมาจาก Backend มาแสดง
      alert(`Booking failed: ${err.message || "Something went wrong"}`);
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 pt-10">
      <div className="text-xl font-medium">New Booking</div>

      <div className="w-fit space-y-3 flex flex-col">
        {/* 🔥 เลือก Coworking Space (ดึงจาก API) */}
        <FormControl variant="standard" fullWidth disabled={loadingSpaces}>
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            labelId="venue-label"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
          >
            {loadingSpaces ? (
              <MenuItem value="" disabled>Loading spaces...</MenuItem>
            ) : (
              spaces.map((space) => (
                <MenuItem key={space._id} value={space._id}>
                  {space.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* 🔥 Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Booking Date"
            value={bookDate}
            onChange={(newValue) => setBookDate(newValue)}
            slotProps={{ textField: { variant: "standard" } }}
          />
        </LocalizationProvider>
      </div>

      <Button
        variant="contained"
        onClick={handleBookVenue}
        disabled={loadingSpaces}
      >
        Book Venue
      </Button>
    </main>
  );
}