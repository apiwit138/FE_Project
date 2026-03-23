"use client";

import { useEffect, useState } from "react";
import { CircularProgress, Rating } from "@mui/material";
import { getReviews } from "@/libs/api";
import dayjs from "dayjs";

export default function AllReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews();
        // เอาข้อมูลรีวิวล่าสุดขึ้นก่อน (Reverse)
        setReviews(res.data.reverse()); 
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Community Reviews 🌟</h1>
          <p className="text-gray-500">See what others are saying about our spaces.</p>
        </div>
        
        {reviews.length === 0 ? (
          <div className="text-center text-gray-400 mt-10 p-10 bg-white rounded-2xl shadow-sm border border-gray-100">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div 
                key={review._id} 
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    {/* ✅ ถ้า Backend ดึงชื่อ Space มาให้ จะแสดงตรงนี้ ถ้าไม่มีจะขึ้น Venue */}
                    <span className="font-semibold text-blue-800 text-lg">
                      {review.coworkingSpace?.name || "Venue"}
                    </span>
                    <Rating value={review.rating} readOnly size="small" />
                  </div>
                </div>
                
                {/* ข้อความรีวิว */}
                <p className="text-gray-600 text-sm italic flex-grow">
                  "{review.comment}"
                </p>
                
                {/* ข้อมูลคนโพสต์ & วันที่ */}
                <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 font-medium">
                  <span className="flex items-center">
                    👤 {review.user?.name || "Anonymous Member"}
                  </span>
                  <span>{dayjs(review.createdAt).format("DD MMM YYYY")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}