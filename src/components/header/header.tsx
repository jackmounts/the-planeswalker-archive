"use client";
import Link from "next/link";
import React, { useEffect } from "react";
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
  CirclePlus,
  CircleUserRound,
  Home,
  LibraryBig,
  LogOut,
  ScanQrCode,
  Search,
  Settings,
  User,
} from "lucide-react";
import { getPlaceholder } from "@/utils/placeholder.generator";

const Header: React.FC = () => {
  const [placeholder, setPlaceholder] = React.useState<string>("");

  useEffect(() => {
    setPlaceholder(getPlaceholder());
  }, []);

  return (
    <header>
      <div className="flex flex-row shrink-0 w-full bg-gradient-to-r from-violet-400 to-[var(--primary-color)] px-8 py-4 justify-between items-center">
        <div className="relative flex items-center bg-gray-50 rounded-2xl w-4/5 text-white">
          <input
            type="text"
            placeholder={placeholder}
            className="px-4 py-1 w-full placeholder:text-gray-500 placeholder:italic text-gray-800 focus-within:outline-none"
          />
          <Search className="text-gray-500 size-6 pe-2" />
        </div>
        <div className="flex flex-row justify-around items-center gap-8 max-lg:hidden">
          <DropdownAdd />
          <DropdownExplore />
          <DropdownProfile />
        </div>
      </div>
    </header>
  );
};

const DropdownAdd: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row justify-center items-center hover:cursor-pointer">
          <CirclePlus className="text-(--primary-color)" fill="white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/collections"}>Collection</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Card</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownExplore: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row justify-center items-center hover:cursor-pointer">
          <div className="text-white text-lg">Explore</div>
          <ChevronDown className="text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={"/"}
            className="flex flex-row justify-start items-center gap-2 w-full"
          >
            <Home />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row justify-start items-center gap-2 w-full">
          <Link
            href={"/collections"}
            className="flex flex-row justify-start items-center gap-2 w-full"
          >
            <LibraryBig />
            Collection
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row justify-start items-center gap-2 w-full">
          <Link
            href={"/scanner"}
            className="flex flex-row justify-start items-center gap-2 w-full"
          >
            <ScanQrCode />
            Scanner
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownProfile: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row justify-center items-center hover:cursor-pointer">
          <CircleUserRound className="text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link
            href={"/profile"}
            className="flex flex-row justify-start items-center gap-2 w-full"
          >
            <User />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/settings"}
            className="flex flex-row justify-start items-center gap-2 w-full"
          >
            <Settings />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <Link href={"/login"}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
