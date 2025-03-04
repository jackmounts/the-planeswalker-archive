import React from "react";
import Image from "next/image";
import homeIcon from "../../../public/icons/home.svg";
import libraryIcon from "../../../public/icons/library.svg";
import accountIcon from "../../../public/icons/account_circle.svg";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex flex-row shrink-0 w-full bg-gray-800 items-center justify-around text-lg font-semibold py-2">
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <Image src={homeIcon} alt="Home Icon" className="size-[45]" />
        </div>
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <Image src={libraryIcon} alt="Library Icon" className="size-[45]" />
        </div>
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <Image src={accountIcon} alt="Account Icon" className="size-[45]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
