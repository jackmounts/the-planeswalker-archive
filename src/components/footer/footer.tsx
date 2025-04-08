import React from "react";
import { CircleUserRound, Home, LibraryBig } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="flex flex-row shrink-0 w-full bg-[var(--primary-color)] items-center justify-around text-lg font-semibold py-2">
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <Home />
        </div>
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <LibraryBig />
        </div>
        <div className="flex flex-col w-full p-4 justify-between items-center">
          <CircleUserRound />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
