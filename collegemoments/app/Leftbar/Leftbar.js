// components/Navbar.js
import Link from 'next/link'
import "./Leftbar.css"

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="navbar flex flex-col navbartext-white text-2xl font-bold">
          <Link href='/' id="home">Club Gallery</Link>

          <ul className="navbarList flex flex-col gap-9 p-9 justify-around">
          <Link href='/'><li className="mt-10 mb-10">Home</li></Link>
            <Link href='/'><li>Clubs</li></Link>
            <Link href='/'><li>Hot Events</li></Link>
            <Link href='/'><li>Upcoming events</li></Link>
          </ul>
          <button className="clubLogin h-3 ">Club Login</button>

        </div>

        {/* <div className="space-x-4">
          <Link href="/Login" className="text-white hover:text-gray-400">
            Login
          </Link>
          <Link href="/Signup" className="text-white hover:text-gray-400">
            Sign Up
          </Link>
        </div> */}
      </div>
    </nav>
  )
}