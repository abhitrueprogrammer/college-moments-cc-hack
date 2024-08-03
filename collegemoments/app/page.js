// import './style/main.css'
'use client'
import Image from "next/image";
import HomeCard from "./homeCard/HomeCard";
import Leftbar from "./Leftbar/Leftbar";
import Searchbar from "./Searchbar/Searchbar"
import SideBar from "@/components/SideBar";
import "./page.css"
import { useState } from "react";

export default function Home() {
  const [nums, setNums] = useState([1, 2, 3, 4, 5, 6])
  const [clubs, setClubs] = useState([
    {
      name: "CodeChef VIT",
      img: "./clubIcons/cc.jpg"
    },
    {
      name: "IEEE VIT",
      img: "./clubIcons/ieee.jpg"
    },
    {
      name: "Music Club VIT",
      img: "./clubIcons/mc.jpg"
    },
    {
      name: "Dance Club VIT",
      img: "./clubIcons/dc.jpg"
    },
    {
      name: "GDSC VIT",
      img: "./clubIcons/gdsc.jpg"
    },
    {
      name: "IEEE-SPS VIT",
      img: "./clubIcons/ieeesps.jpg"
    }
  ])
  return (
    <>
      <div className="main">
        <Leftbar />
        <div className="center">
          <Searchbar/>
          <div className="home-cards">
            {clubs.map((el, ind) => (
              <HomeCard key={ind} imgId={el.img} cName={el.name} />
            ))}
          </div>
        </div>
        <SideBar/>
      </div>
    </>
  );
}
