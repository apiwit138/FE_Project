"use client";

import { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { createReservation } from "@/libs/api";
import { useSession } from "next-auth/react";
export default function Reservations() {

  const [spaceId, setSpaceId] = useState("69a552e756517066dba4a47c"); // default
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const { data: session } = useSession();
const token = session?.user?.token;
  const handleBookVenue = async () => {
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
  } catch (err) {
    alert("Booking failed");
  }
};

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 pt-10">
      <div className="text-xl font-medium">New Booking</div>

      <div className="w-fit space-y-3 flex flex-col">

        {/* 🔥 เลือก Coworking Space (ใช้ id จริง) */}
        <FormControl variant="standard" fullWidth>
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            labelId="venue-label"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
          >
            <MenuItem value="69a552e756517066dba4a47c">Space D</MenuItem>
            <MenuItem value="69a552e356517066dba4a479">Space C</MenuItem>
            <MenuItem value="69a552de56517066dba4a476">Space B</MenuItem>
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
      >
        Book Venue
      </Button>
    </main>
  );
}