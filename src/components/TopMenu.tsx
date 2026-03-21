import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuiItem from './TopMenuItem';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';

export default async function TopMenu(){
    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <Image src={'/img/logo.png'} className={styles.logoimg}
                alt='logo' width={0} height={0} sizes='100vh'/>
            
            {/* เมนู Booking เดิมของคุณ */}
            <TopMenuiItem title='Booking' pageRef='/booking'/>

            <div className='flex items-center absolute right-0 h-full px-2 space-x-4'>
                {/* 1. เพิ่มเมนู My Booking ตามโจทย์ (Slide 10) */}
                <Link href="/mybooking" className='text-cyan-600 text-sm hover:underline'>
                    My Booking
                </Link>

                {/* 2. ส่วนของ Sign-In / Sign-Out เดิม */}
                {
                    session ? (
                        <Link href="/api/auth/signout">
                            <div className='text-cyan-600 text-sm'>
                                Sign-Out of {session.user?.name}
                            </div>
                        </Link>
                    ) : (
                        <Link href="/api/auth/signin">
                            <div className='text-cyan-600 text-sm'>
                                Sign-In
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}