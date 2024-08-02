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
          <Link href="/login">
            <a className="text-white hover:text-gray-400">Login</a>
          </Link>
          <Link href="/signup">
            <a className="text-white hover:text-gray-400">Sign Up</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
