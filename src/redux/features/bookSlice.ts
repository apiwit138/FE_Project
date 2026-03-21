import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defining the BookingItem interface based on the required fields
export interface BookingItem {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
}

// 1. Define the BookState type
export interface BookState {
  bookItems: BookingItem[];
}

// 2. Set the Initial State
const initialState: BookState = {
  bookItems: [],
};

// 3. Create the Slice and Reducer Functions
export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const newBooking = action.payload;
      
      // Check if a booking exists for the same venue on the same date
      const existingIndex = state.bookItems.findIndex(
        (item) => item.venue === newBooking.venue && item.bookDate === newBooking.bookDate
      );

      if (existingIndex !== -1) {
        // Replace the old booking data with the new one
        state.bookItems[existingIndex] = newBooking;
      } else {
        // Add as a new booking
        state.bookItems.push(newBooking);
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      const target = action.payload;
      
      // Filter out the item that matches nameLastname, tel, venue, and bookDate
      state.bookItems = state.bookItems.filter(
        (item) => 
          !(item.nameLastname === target.nameLastname &&
            item.tel === target.tel &&
            item.venue === target.venue &&
            item.bookDate === target.bookDate)
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;