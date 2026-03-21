"use client"
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { Button } from "@mui/material";

export default function BookingList() {
    // 1. ดึงข้อมูลจาก Redux Store (ชื่อ 'bookSlice' ตามที่ตั้งไว้ใน store.ts)
    const bookingItems = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch();

    // กรณีไม่มีข้อมูลการจอง
    if (bookingItems.length === 0) {
        return (
            <div className="text-center text-xl font-semibold mt-10">
                No Venue Booking
            </div>
        );
    }

    return (
        <div className="space-y-4 p-5">
            {bookingItems.map((item) => (
                <div 
                    key={`${item.venue}-${item.bookDate}`} 
                    className="bg-slate-200 rounded px-5 py-3 shadow-md"
                >
                    <div className="text-md"><b>Name-Lastname:</b> {item.nameLastname}</div>
                    <div className="text-md"><b>Contact-Number:</b> {item.tel}</div>
                    <div className="text-md"><b>Venue:</b> {item.venue}</div>
                    <div className="text-md"><b>Date:</b> {item.bookDate}</div>
                    
                    <Button 
                        variant="contained" 
                        color="error" 
                        className="mt-2"
                        onClick={() => dispatch(removeBooking(item))}
                    >
                        Cancel Booking
                    </Button>
                </div>
            ))}
        </div>
    );
}