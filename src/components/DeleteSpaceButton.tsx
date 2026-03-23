"use client";

import { useRouter } from "next/navigation";
import { deleteCoworkingSpace } from "@/libs/api";

export default function DeleteSpaceButton({
  spaceId,
  spaceName,
  token,
}: {
  spaceId: string;
  spaceName: string;
  token: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    // ดักไว้ก่อน เผื่อมือลั่นไปโดน
    if (!confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสถานที่ "${spaceName}"?`)) return;

    try {
      // เรียกใช้ API ลบ ที่เราเพิ่งเขียนไว้
      await deleteCoworkingSpace(token, spaceId);
      alert("🗑️ ลบ Coworking Space สำเร็จ!");
      
      // สั่งให้หน้าเว็บดึงข้อมูลใหม่ (ทำให้การ์ดที่ถูกลบหายไปจากหน้าจอทันที)
      router.refresh(); 
    } catch (error: any) {
      alert(`❌ เกิดข้อผิดพลาด: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors p-1"
      title="Delete Space"
    >
      {/* ไอคอนถังขยะ */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </button>
  );
}