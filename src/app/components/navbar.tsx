'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-black w-full px-6 py-4 flex items-center">
      <Link href="/" className="text-2xl font-bold text-purple-700">
        CCNY Connect
      </Link>

      <div className="flex flex-1 justify-evenly text-lg font-medium ml-10">
        <Link
          href="/home"
          className={
            pathname === '/home'
              ? 'text-purple-600'
              : 'text-white hover:text-purple-500'
          }
        >
          Dashboard
        </Link>
        <Link
          href="/friends"
          className={
            pathname === '/friends'
              ? 'text-purple-600'
              : 'text-white hover:text-purple-500'
          }
        >
          Friends
        </Link>
        <Link
          href="/courses"
          className={
            pathname === '/courses'
              ? 'text-purple-600'
              : 'text-white hover:text-purple-500'
          }
        >
          Courses
        </Link>
              <Link href="/profile" className={
            pathname === '/profile'
              ? 'text-purple-600'
              : 'text-white hover:text-purple-500'
          }>
        <User className="w-8 h-8" />
      </Link>
      </div>
    </nav>
  )
}
