// components/Navbar.js
import Link from 'next/link'
import "./SearchBar.css"

export default function SearchBar() {
    return (
        <div className="relative mt-7 ml-35 flex justify-start items-center h-8">
            

            <input className="searchBar ml-20" placeholder='Search for club ...'></input>
            <div className="searchIcon absolute right-3">
            <svg width="20" height="25" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2967 19.4969H18.0772L17.6449 19.0183C19.1578 16.9977 20.0686 14.3745 20.0686 11.5209C20.0686 5.1578 15.5763 0 10.0343 0C4.49228 0 0 5.1578 0 11.5209C0 17.8839 4.49228 23.0417 10.0343 23.0417C12.5197 23.0417 14.8045 21.996 16.5643 20.259L16.9811 20.7553V22.1555L24.6998 31L27 28.3591L19.2967 19.4969ZM10.0343 19.4969C6.19039 19.4969 3.08748 15.9342 3.08748 11.5209C3.08748 7.10749 6.19039 3.54488 10.0343 3.54488C13.8782 3.54488 16.9811 7.10749 16.9811 11.5209C16.9811 15.9342 13.8782 19.4969 10.0343 19.4969Z" fill="black" />
            </svg>
            </div>
        </div>

    )
}
