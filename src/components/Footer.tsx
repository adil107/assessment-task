"use client";

import React from "react";
import { usePathname } from "next/navigation";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on auth pages
  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="w-full border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 text-[11px] text-slate-500">
        <span>© {new Date().getFullYear()} Assessment App</span>
        <span>Built with Next.js & Tailwind</span>
      </div>
    </footer>
  );
};

