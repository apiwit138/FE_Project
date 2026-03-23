"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, TextField, Rating, Typography, CircularProgress } from "@mui/material";
import { createReview } from "@/libs/api";

export default function CreateReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const reservationId = params.id as string;
  const token = session?.user?.token;

  // State สำหรับเก็บค่าฟอร์ม
  const [rating, setRating] = useState<number | null>(5); // Default ให้ 5 ดาวไปเลย 🌟
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ป้องกันคนยังไม่ล็อกอิน
  if (status === "loading") {
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress />
      </div>
    );
  }

  if (status === "unauthenticated" || !token) {
    return (
      <div className="text-center mt-20 text-red-500 font-semibold">
        Please login to write a review.
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!rating) return alert("Please give a rating (1-5 stars)");
    if (!comment.trim()) return alert("Please write a comment");

    setSubmitting(true);
    try {
      await createReview(token, reservationId, rating, comment);
      
      alert("Thank you for your review! 💖");
      router.push("/mybooking"); // กลับไปหน้ารายการจอง
      router.refresh(); 
    } catch (err: any) {
      alert(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center space-y-6 pt-10 pb-10 min-h-screen bg-slate-50">
      <div className="text-3xl font-bold text-gray-800">Rate Your Experience</div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-[90%] max-w-md flex flex-col space-y-6">
        
        {/* ส่วนให้คะแนน (Rating) */}
        <div className="flex flex-col items-center space-y-2 border-b pb-6">
          <Typography component="legend" className="text-gray-600 font-medium">
            How was the coworking space?
          </Typography>
          <Rating
            name="space-rating"
            value={rating}
            size="large"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </div>

        {/* ส่วนพิมพ์คอมเมนต์ */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Share your thoughts
          </label>
          <TextField
            multiline
            rows={4}
            variant="outlined"
            placeholder="Very very good place!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
        </div>

        {/* ปุ่ม Action */}
        <div className="flex space-x-3 pt-4">
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            onClick={() => router.back()}
            disabled={submitting}
            className="text-gray-600 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>

      </div>
    </main>
  );
}