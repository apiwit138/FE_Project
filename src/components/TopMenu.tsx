'use client';

import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuiItem from './TopMenuItem';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function TopMenu() {
    const { data: session } = useSession();

    return (
        <div className={styles.menucontainer}>
            {/* ✅ ครอบ Link ที่โลโก้ เพื่อให้กดแล้วกลับไปหน้า Home (/) */}
            <Link href="/" className="flex items-center">
                <Image 
                    src={'/img/logo.png'} 
                    className={styles.logoimg}
                    alt='logo' 
                    width={0} 
                    height={0} 
                    sizes='100vh'
                />
            </Link>
            
            {/* ✅ เพิ่มปุ่มเมนู Reviews ไว้ตรงนี้ครับ */}
            <div className="flex flex-row ml-4 space-x-2">
                <TopMenuiItem title='Home' pageRef='/'/>
                <TopMenuiItem title='Booking' pageRef='/booking'/>
                <TopMenuiItem title='Reviews' pageRef='/review'/> {/* 🔥 เพิ่มบรรทัดนี้ */}
            </div>

            <div className='flex items-center absolute right-0 h-full px-2 space-x-4'>
                {/* 🔹 My Booking */}
                <Link href="/mybooking" className='text-cyan-600 text-sm hover:underline'>
                    My Booking
                </Link>

                {session ? (
                    <>
                        {/* 🔹 แสดงชื่อ + Sign out */}
                        <span className='text-sm font-medium text-gray-700'>
                            {session.user?.name}
                        </span>

                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className='text-red-500 text-sm hover:underline font-medium'
                        >
                            Sign-Out
                        </button>
                    </>
                ) : (
                    <>
                        {/* 🔹 Sign-In */}
                        <Link href="/api/auth/signin">
                            <div className='text-cyan-600 text-sm hover:underline font-medium'>
                                Log-in
                            </div>
                        </Link>

                        {/* 🔥 ปุ่ม Register */}
                        <Link href="/register">
                            <div className='bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition-colors shadow-sm'>
                                Register
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}