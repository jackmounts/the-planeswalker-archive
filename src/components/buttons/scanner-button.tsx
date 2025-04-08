"use client";
import React from "react";
import { Plus } from "lucide-react";

const ScannerButton: React.FC = () => {
  const handleClick = () => {
    console.log("Scanner button clicked");
  };

  return (
    <div className="absolute right-0 bottom-0 p-4 z-50 ">
      <button
        onClick={handleClick}
        className="rounded-full bg-[var(--primary-color)] p-4"
      >
        <Plus className="text-white" />
      </button>
    </div>
  );
};

export default ScannerButton;
