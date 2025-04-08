import React from "react";
import { CircleUserRound, Home, LibraryBig } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex flex-row shrink-0 w-full bg-[var(--primary-color)] items-center justify-around text-lg font-semibold py-2">
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <Home className="text-white" />
        </div>
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <LibraryBig className="text-white" />
        </div>
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <CircleUserRound className="text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
