"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import searchIcon from "../../../public/icons/search.svg";
import accountIcon from "../../../public/icons/account_circle.svg";
import dropdownIcon from "../../../public/icons/arrow_drop_down.svg";
import homeIcon from "../../../public/icons/home.svg";
import collectionIcon from "../../../public/icons/library.svg";
import addIcon from "../../../public/icons/add.svg";
import personIcon from "../../../public/icons/person.svg";
import logoutIcon from "../../../public/icons/logout.svg";

const Header: React.FC = () => {
  return (
    <header>
      <div className="flex flex-row shrink-0 w-full bg-[var(--primary-color)] px-8 py-4 justify-between items-center">
        <div className="relative flex items-center bg-gray-50 rounded-2xl w-4/5 text-white">
          <input
            type="text"
            placeholder="Sol Ring"
            className="px-4 py-1 w-full placeholder:text-gray-500 placeholder:italic text-gray-800 focus-within:outline-none"
          />
          <Image
            src={searchIcon}
            alt={"Search image"}
            className="absolute right-0 invert me-2"
            onClick={() => console.log("Search")}
          />
        </div>
        <div className="flex flex-row justify-around items-center gap-8">
          <DropdownExplore />
          <DropdownProfile />
        </div>
      </div>
    </header>
  );
};

const DropdownExplore: React.FC = () => {
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
    <div className="relative inline-block max-lg:hidden" ref={dropdownRef}>
      <div
        className="flex flex-row justify-center items-center hover:cursor-pointer hover:font-semibold"
        onClick={toggleDropdown}
      >
        <div className="text-white text-lg">Explore</div>
        <Image
          src={dropdownIcon}
          alt={"Dropdown image"}
          className={isDropdownOpen ? "rotate-180" : ""}
        />
      </div>
      {isDropdownOpen && (
        <ul className="absolute text-lg top-full right-0 px-8 py-6 z-50 bg-white dark:bg-[var(--background)] rounded-2xl shadow-lg min-w-max">
          <li className="flex flex-row justify-start items-center gap-1 hover:font-bold cursor-pointer">
            <Image src={homeIcon} alt={"Home icon"} className="invert" />
            <Link href={"/"} onClick={toggleDropdown}>
              Home
            </Link>
          </li>
          <li className="flex flex-row justify-start items-center gap-1 hover:font-bold cursor-pointer py-2">
            <Image
              src={collectionIcon}
              alt={"Collection icon"}
              className="invert"
            />
            <Link href={"/collection"} onClick={toggleDropdown}>
              Collection
            </Link>
          </li>
          <li className="flex flex-row justify-start items-center gap-1 hover:font-bold cursor-pointer">
            <Image src={addIcon} alt={"Scanner icon"} className="invert" />
            <Link href={"/scanner"} onClick={toggleDropdown}>
              Scanner
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

const DropdownProfile: React.FC = () => {
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
    <div className="relative inline-block max-lg:hidden" ref={dropdownRef}>
      <div
        className="flex flex-row justify-center items-center hover:cursor-pointer hover:font-semibold"
        onClick={toggleDropdown}
      >
        <Image
          src={accountIcon}
          alt={"Account image"}
          className="size-8 hover:scale-110 hover:cursor-pointer"
        />
      </div>
      {isDropdownOpen && (
        <ul className="absolute text-lg top-full right-0 py-6 px-8 z-50 bg-white dark:bg-[var(--background)] rounded-2xl shadow-lg min-w-max">
          <li className="flex flex-row justify-start items-center gap-1 hover:font-bold cursor-pointer">
            <Image src={personIcon} alt={"Home icon"} className="invert" />
            <Link href={"/profile"} onClick={toggleDropdown}>
              Profile
            </Link>
          </li>
          <li className="flex flex-row justify-start items-center gap-1 hover:font-bold cursor-pointer pt-2">
            <Image src={logoutIcon} alt={"Home icon"} className="invert" />
            <Link href={"/login"} onClick={toggleDropdown}>
              Log out
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
