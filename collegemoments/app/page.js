// import './style/main.css'
import Image from "next/image";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar"

export default function Home() {
  return (
    <div className="flex">
      <Navbar/>
      <SearchBar/>
    </div>
  );
}
