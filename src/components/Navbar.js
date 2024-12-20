import React, { useState } from "react";
import Avatar from "react-avatar";

import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";

import logo from "../utils/logo.png";
import profile from "../utils/profile.jpg";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { toggleSidebar } = useSidebar();

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex items-center justify-between fixed top-0 w-full bg-white px-4 py-2 shadow-md ">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <AiOutlineMenu
          className="text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
        <a href="/">
          <img
            src={logo}
            alt="YouTube Logo"
            className="w-24 md:w-28 cursor-pointer"
          />
        </a>
      </div>

      {/* Center Section */}
      <div className="hidden md:flex w-[50%] items-center">
        <div className="flex w-full border border-gray-400 rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-4 py-2 outline-none rounded-l-full"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
          <button
            className="px-4 py-2 bg-gray-100 rounded-r-full"
            onClick={() => searchQueryHandler("searchButton")}
          >
            <CiSearch size={"24px"} />
          </button>
        </div>
        <IoMdMic
          size={"42px"}
          className="ml-3 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <RiVideoAddLine className="text-2xl hidden sm:block" />
        <AiOutlineBell className="text-2xl hidden sm:block" />
        <Avatar src={profile} size="32" round={true} />
      </div>

      {/* Mobile Search Button */}
      <div className="md:hidden flex items-center">
        {isSearchOpen ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 border border-gray-400 rounded"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              value={searchQuery}
            />
            <button
              className="p-2 bg-gray-100 rounded"
              onClick={() => searchQueryHandler("searchButton")}
            >
              <CiSearch size={"20px"} />
            </button>
          </div>
        ) : (
          <button
            className="p-2 bg-gray-100 rounded"
            onClick={() => setIsSearchOpen(true)}
          >
            <CiSearch size={"24px"} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
