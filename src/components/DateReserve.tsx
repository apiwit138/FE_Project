"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function DateReserve() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Reserve Date" />
    </LocalizationProvider>
  )
}