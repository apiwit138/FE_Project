import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopMenu from '@/components/TopMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import NextAuthProvider from '@/providers/NextAuthProvider'
import ReduxProvider from '@/redux/ReduxProvider' // 1. Import ReduxProvider ที่สร้างไว้

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Venue Explorer',
  description: 'Book your favorite venues',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. ครอบทับ children ทั้งหมดด้วย ReduxProvider */}
        <ReduxProvider> 
          <NextAuthProvider session={session}>
            <TopMenu />
            {children}
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}