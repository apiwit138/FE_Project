"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking, setBookings } from "@/redux/features/bookSlice";
import { Button } from "@mui/material";
import { deleteReservation, getReservations } from "@/libs/api";
import { useSession } from "next-auth/react";

export default function BookingList() {
  const bookingItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const token = session?.user?.token;

  // 🔥 โหลด booking จาก backend
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      const res = await getReservations(token);

      // 🔥 map ให้ตรง interface
      const formatted = res.data.map((item: any) => ({
        _id: item._id,
        nameLastname: item.user?.name || "Unknown",
        tel: "N/A",
        venue: item.coworkingSpace?.name || "Unknown",
        bookDate: item.reservationDate,
      }));

      dispatch(setBookings(formatted));
    };

    fetchData();
  }, [token, dispatch]);

  // 🔥 delete booking
  const handleDelete = async (id: string) => {
    if (!token) {
      alert("Please login");
      return;
    }

    try {
      await deleteReservation(token, id);
      dispatch(removeBooking(id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (bookingItems.length === 0) {
    return <div className="text-center mt-10">No Booking</div>;
  }

  return (
    <div className="space-y-4 p-5">
      {bookingItems.map((item) => (
        <div key={item._id} className="bg-slate-200 p-4 rounded">
          <div><b>Name:</b> {item.nameLastname}</div>
          <div><b>Venue:</b> {item.venue}</div>
          <div><b>Date:</b> {item.bookDate}</div>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(item._id)}
          >
            Cancel
          </Button>
        </div>
      ))}
    </div>
  );
}