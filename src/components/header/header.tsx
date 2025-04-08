"use client";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  CircleUserRound,
  Home,
  LibraryBig,
  ScanQrCode,
  Search,
} from "lucide-react";

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
          <Search className="text-gray-500 size-6 pe-2" />
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row justify-center items-center hover:cursor-pointer hover:scale-105">
          <div className="text-white text-lg">Explore</div>
          <ChevronDown className="text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Home />
          <Link href={"/"}>Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LibraryBig />
          <Link href={"/collection"}>Collection</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ScanQrCode />
          <Link href={"/scanner"}>Scanner</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownProfile: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row justify-center items-center hover:cursor-pointer hover:scale-105">
          <CircleUserRound className="text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/collection"}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/scanner"}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <div className="relative inline-block max-lg:hidden" ref={dropdownRef}>
    //   <div
    //     className="flex flex-row justify-center items-center hover:cursor-pointer hover:font-semibold"
    //     onClick={toggleDropdown}
    //   >
    //     <Image
    //       src={accountIcon}
    //       alt={"Account image"}
    //       className="size-8 hover:scale-110 hover:cursor-pointer"
    //     />
    //   </div>
    //   {isDropdownOpen && (
    //     <ul className="absolute text-lg top-full right-0 py-6 px-8 z-50 bg-white dark:bg-[var(--background)] rounded-2xl shadow-lg min-w-max">
    //       <li className="flex flex-row justify-start items-center gap-1 hover:font-bold cursor-pointer">
    //         <Image src={personIcon} alt={"Home icon"} className="invert" />
    //         <Link href={"/profile"} onClick={toggleDropdown}>
    //           Profile
    //         </Link>
    //       </li>
    //       <li className="flex flex-row justify-start items-center gap-1 hover:font-bold cursor-pointer pt-2">
    //         <Image src={logoutIcon} alt={"Home icon"} className="invert" />
    //         <Link href={"/login"} onClick={toggleDropdown}>
    //           Log out
    //         </Link>
    //       </li>
    //     </ul>
    //   )}
    // </div>
  );
};

export default Header;
