// components/Navbar.js

import Link from 'next/link'
import "./SideBar.css"

export default function SideBar() {
    return (
        <div className='sideBar'>
            <p className='sideBarHeading'>Featured</p>
            <div className='sideCard'></div>
            <div className='sideCard'></div>
            <div className='sideCard'></div>
            <div className='sideCard'></div>
        </div>

    )
}
