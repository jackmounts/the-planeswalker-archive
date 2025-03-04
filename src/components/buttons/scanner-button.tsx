"use client";
import React from "react";
import Image from "next/image";
import addIcon from "../../../public/icons/add.svg";

const ScannerButton: React.FC = () => {
  const handleClick = () => {
    console.log("Scanner button clicked");
  };

  return (
    <div className="absolute right-0 bottom-0 p-4 z-50 ">
      <button onClick={handleClick} className="rounded-full bg-gray-800 p-4">
        <Image src={addIcon} alt={"Add icon"} className="size-[30]"></Image>
      </button>
    </div>
  );
};

export default ScannerButton;
