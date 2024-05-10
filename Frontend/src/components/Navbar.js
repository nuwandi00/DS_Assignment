import React from 'react';
import { GlobeAltIcon, MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";

function Navbar() {
  return (
    <div>
      <div className="flex space-x-4 bg-white h-[74px] shadow-lg text-center justify-between items-center px-4">
        <MenuIcon className="h-6 w-6 md:hidden"/>
        <h2 className="text-3xl font-bold">EduWave</h2>
        <h3 className="hidden text-sm md:block">Categories</h3>
        <form className="hidden bg-[#f8fafb] md:flex border border-black rounded-3xl flex-1 h-12 item-center">
          <SearchIcon className="h-5 w-5 mx-4 text-gray-400"/>
          <input 
          type="text"
          placeholder="Search for anything"
          className="bg-trasparent text-sm outline-none"/>
        </form>
        <h3 className="hidden text-sm lg:block">About EduWave</h3>
        <h3 className="hidden text-sm lg:block md:hidden">My Learnings</h3>
        <div className="flex">

        <SearchIcon className="h-6 w-6 text-gray-400 md:hiddem"/>
        <ShoppingCartIcon className="h-6 w-6"/>
        </div>
        <div className="hidden md:flex pr-4 space-x-4 justify-end">
          <button className="border border-black h-10 text-sm font-bold w-20 hover:bg-[#F5F5F5]">
            Log In
          </button>
          <button className="border bg-black text-white border-black h-10 text-sm font-bold w-20 ">
            Sign Up
          </button>
          <button className="border border-black w-10 flex items-center justify-center hover:bg-[F5F5F5]">
            <GlobeAltIcon className="h-5 w-5"/>

          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
