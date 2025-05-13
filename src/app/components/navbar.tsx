// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-black px-6 py-4 flex w-100vw justify-between">
      {/* Brand */}
      <Link
        href="/"
        className="text-2xl font-bold text-purple-500"
      >
        CCNY Connect
      </Link>

      {/* Nav links */}
      <div className="flex space-x-8">
        <Link
          href="/home"
          className={
            `text-sm font-medium ` +
            (pathname === '/home'
              ? 'text-purple-500'
              : 'text-white hover:text-purple-400')
          }
        >
          Dashboard
        </Link>

        <Link
          href="/friends"
          className={
            `text-sm font-medium ` +
            (pathname === '/friends'
              ? 'text-purple-500'
              : 'text-white hover:text-purple-400')
          }
        >
          Friends
        </Link>

        <Link
          href="/courses"
          className={
            `text-sm font-medium ` +
            (pathname === '/courses'
              ? 'text-purple-500'
              : 'text-white hover:text-purple-400')
          }
        >
          Courses
        </Link>
      </div>

      {/* Profile icon */}
      <Link
        href="/profile"
        className="text-white hover:text-purple-400"
      >
        <User className="w-6 h-6" />
      </Link>
    </nav>
  )
}
