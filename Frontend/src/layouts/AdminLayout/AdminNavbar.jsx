import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";

function Navbar({setIsMenu}) {

  const {user} = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div 
          onClick={()=> setIsMenu(prev => !prev)}
          className="flex left-4 cursor-pointer text-blue-600 hover:text-blue-400 text-[20px] lg:hidden"
      >
          <AiOutlineMenu />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-slate-800">Admin Dashboard</h1>
        <p className="text-xs text-slate-400">Manage your store</p>
      </div>

      <div className="flex items-center gap-5">

        {/* <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
          <IoNotificationsOutline className="text-xl" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button> */}

        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <FaUser className="text-sm" />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-800">{user.username}</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>

          {/* <FiChevronDown className="text-slate-400" /> */}
        </div>

      </div>
    </header>
  );
}

export default Navbar;