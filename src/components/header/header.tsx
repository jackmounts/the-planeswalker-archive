"use client";
import Image from "next/image";
import React from "react";
import searchImage from "../../../public/icons/search.svg";

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex flex-row shrink-0 w-full bg-gray-800 p-4">
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
      </div>
    </header>
  );
};

export default Header;
