"use client";

import React from "react";
import { usePathname } from "next/navigation";

type HeaderProps = {
  userName: string;
  onLogout?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  const pathname = usePathname();

  // Hide header on auth pages
  if (pathname.startsWith("/auth")) {
    return null;
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback: just log for now
      console.log("Logout clicked");
    }
  };

  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-[#171717]">
            Assessment
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#171717]">Hi, {userName}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
