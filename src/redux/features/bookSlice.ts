import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 🔥 Interface ให้ตรง backend
export interface BookingItem {
  _id: string;              // 🔥 สำคัญมาก
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
}

// 🔥 State
export interface BookState {
  bookItems: BookingItem[];
}

const initialState: BookState = {
  bookItems: [],
};

// 🔥 Slice
export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    // ✅ Add booking (ใช้ _id)
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const newBooking = action.payload;

      const exists = state.bookItems.find(
        (item) => item._id === newBooking._id
      );

      if (!exists) {
        state.bookItems.push(newBooking);
      }
    },

    // ✅ Set booking ทั้ง list (ใช้ตอน fetch จาก backend)
    setBookings: (state, action: PayloadAction<BookingItem[]>) => {
      state.bookItems = action.payload;
    },

    // ✅ Remove booking (ใช้ _id)
    removeBooking: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.bookItems = state.bookItems.filter(
        (item) => item._id !== id
      );
    },
  },
});

export const { addBooking, removeBooking, setBookings } = bookSlice.actions;
export default bookSlice.reducer;