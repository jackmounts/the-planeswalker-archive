"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import searchImage from "../../../public/icons/search.svg";
import accountImage from "../../../public/icons/account_circle.svg";
import dropdownImage from "../../../public/icons/arrow_drop_down.svg";

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex flex-row shrink-0 w-full bg-[var(--primary-color)] p-4 justify-between items-center">
        <div className="relative flex items-center bg-gray-50 rounded-2xl w-4/5 text-white">
          <input
            type="text"
            placeholder="Sol Ring"
            className="px-2 py-1 placeholder:text-gray-500 placeholder:italic text-gray-800 focus-within:outline-none"
          />
          <Image
            src={searchImage}
            alt={"Search image"}
            className="absolute right-0 invert me-2"
            onClick={() => console.log("Search")}
          />
        </div>
        <Dropdown />
        <div className="max-md:hidden">
          <Image
            src={accountImage}
            alt={"Account image"}
            className="size-8 hover:scale-110 hover:cursor-pointer"
            onClick={() => console.log("Profile")}
          />
        </div>
      </div>
    </header>
  );
};

const Dropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative  inline-block max-md:hidden" ref={dropdownRef}>
      <div
        className="flex flex-row justify-center items-center hover:cursor-pointer hover:font-semibold"
        onClick={toggleDropdown}
      >
        <div className="text-white text-lg">Explore</div>
        <Image
          src={dropdownImage}
          alt={"Dropdown image"}
          onClick={() => console.log("Dropdown")}
        />
      </div>
      {isDropdownOpen && (
        <ul className="absolute top-full left-0 p-8 z-50 bg-white dark:bg-[var(--background)] rounded-2xl shadow-lg min-w-[200px]">
          <li className="hover:font-bold cursor-pointer">Home</li>
          <li className="hover:font-bold cursor-pointer py-2">Collections</li>
          <li className="hover:font-bold cursor-pointer">Scanner</li>
        </ul>
      )}
    </div>
  );
};

export default Header;
