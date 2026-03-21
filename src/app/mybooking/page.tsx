import BookingList from "@/components/BookingList";

export default function MyBookingPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Venue Bookings</h1>
      
      {/* นำ Component BookingList มาวางไว้บนหน้านี้ */}
      <BookingList />
    </main>
  );
}