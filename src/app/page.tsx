import Banner from "@/components/Banner";
import getSpaces from "@/libs/getSpaces";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
// 🔹 1. Import ปุ่มลบที่เราเพิ่งสร้าง
import DeleteSpaceButton from "@/components/DeleteSpaceButton"; 

export default async function Home() {
  const result = await getSpaces();
  
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "admin";

  return (
    <main className="bg-slate-50 min-h-screen pb-10">
      <Banner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Explore Coworking Spaces
          </h1>

          {isAdmin && (
            <Link href="/coworkingspaces/add">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2">
                <span className="text-lg">+</span> Add Coworking Space
              </button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.data.map((item: any) => (
            <div
              key={item._id}
              // 🔹 2. เพิ่ม class 'relative' ตรงนี้ เพื่อให้ไอคอนถังขยะลอยอยู่มุมขวาบนของการ์ดได้
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col relative"
            >
              
              {/* 🔹 3. ถ้าเป็น Admin ให้โชว์ปุ่มลบ พร้อมส่งข้อมูลที่จำเป็นไปให้ Component */}
              {isAdmin && (
                <DeleteSpaceButton 
                  spaceId={item._id} 
                  spaceName={item.name} 
                  token={session.user.token} 
                />
              )}

              <h2 className="text-xl font-bold text-blue-800 mb-3 pr-6 line-clamp-1">
                {item.name}
              </h2>

              <div className="space-y-2 mb-6 flex-grow">
                <p className="text-sm text-gray-600 flex items-start">
                  <span className="mr-2">📍</span>
                  <span className="line-clamp-2">{item.address}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2">⏰</span>
                  {item.openTime} - {item.closeTime}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                  📊 Reservations: {item.reservations?.length || 0}
                </span>
                
                <Link href="/booking">
                  <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg transition-colors">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}