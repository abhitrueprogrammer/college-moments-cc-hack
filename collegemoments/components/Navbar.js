// components/Navbar.js
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">MyApp</Link>
        </div>
        <div className="space-x-4">
          <Link href="/Login" className="text-white hover:text-gray-400">
            Login
          </Link>
          <Link href="/Signup" className="text-white hover:text-gray-400">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
