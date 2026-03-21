"use client"; // 1. Change to client component

import { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Reservations() {
  const dispatch = useDispatch<AppDispatch>();

  // 2. Local states for form inputs
  const [nameLastname, setNameLastname] = useState("");
  const [tel, setTel] = useState("");
  const [venue, setVenue] = useState("Bloom");
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);

  const handleBookVenue = () => {
    if (nameLastname && tel && venue && bookDate) {
      // 3. Dispatch to Redux store
      dispatch(
        addBooking({
          nameLastname,
          tel,
          venue,
          bookDate: bookDate.format("YYYY-MM-DD"),
        })
      );
      alert("Booking added to Redux Store");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 pt-10">
      <div className="text-xl font-medium">New Booking</div>

      {/* 4. Server Session and Profile display removed as per instructions */}

      <div className="w-fit space-y-3 flex flex-col">
        <TextField
          variant="standard"
          name="Name-Lastname"
          label="Name-Lastname"
          value={nameLastname}
          onChange={(e) => setNameLastname(e.target.value)}
        />

        <TextField
          variant="standard"
          name="Contact-Number"
          label="Contact-Number"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />

        <FormControl variant="standard" fullWidth>
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            labelId="venue-label"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </FormControl>

        {/* Using DatePicker directly for easier state management with Redux */}
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
        name="Book Venue"
        onClick={handleBookVenue} // 5. Handle click to dispatch
      >
        Book Venue
      </Button>
    </main>
  );
}