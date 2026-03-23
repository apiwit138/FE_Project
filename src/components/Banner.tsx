'use client'
import { useState } from 'react';
import styles from './banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
    // ✅ 1. เปลี่ยนรายชื่อไฟล์รูปภาพให้เป็น co1 ถึง co7
    const covers = [
        '/img/co1.jpg', 
        '/img/co2.jpg', 
        '/img/co3.jpg', 
        '/img/co4.jpg', 
        '/img/co5.jpg', 
        '/img/co6.jpg', 
        '/img/co7.jpg'
    ];
    
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className={styles.banner} onClick={() => setIndex(index + 1)}>

            {/* ✅ 2. เปลี่ยน %4 เป็น %covers.length (ซึ่งก็คือ %7) */}
            <Image 
                src={covers[index % covers.length]} 
                alt='cover' 
                priority 
                fill={true} 
                style={{ objectFit: 'cover' }} // ปรับให้ใช้ style แทนเพื่อลด Warning ของ Next.js เวอร์ชั่นใหม่
            />
            
            <div className={styles.bannerText}>
                <h1 className='text-xl font-medium'>
                   Every Co-WorkingSpace Can Book Here
                </h1>
            </div>
            
            {session ? (
                <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>
                    Welcome {session.user?.name}
                </div>
            ) : null}
            
           
        </div>
    );
}