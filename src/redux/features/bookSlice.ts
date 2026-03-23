// ในไฟล์ src/redux/features/bookSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// ✅ นำเข้า Interface จากตัวนอก (ปรับ path ให้ถูก ถ้าไฟล์อยู่นอก src ต้อง ../../../interface)
import { BookingItem } from "../../../interface"; 

interface BookState {
    bookItems: BookingItem[];
}

const initialState: BookState = {
    bookItems: []
};

export const bookSlice = createSlice({
    name: "bookSlice",
    initialState,
    reducers: {
        setBookings: (state, action: PayloadAction<BookingItem[]>) => {
            state.bookItems = action.payload;
        },
        removeBooking: (state, action: PayloadAction<string>) => {
            state.bookItems = state.bookItems.filter(item => item._id !== action.payload);
        },
        // ... reducers อื่นๆ
    }
});

export const { setBookings, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;