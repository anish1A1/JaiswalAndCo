"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal, // 1. Added Portal import
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    // 2. Fixed z-200 to z-[200] (using brackets for arbitrary values)
    <header className="sticky top-0 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-red-600"
        >
          JS
        </Link>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>

          {/* 3. Wrapped with Portal so the menu floats perfectly on mobile viewports */}
          <DropdownMenuPortal>
            <DropdownMenuContent align="end">
              {/* 1. Added the render prop to inject the Link component safely */}
              <DropdownMenuItem render={<Link href="/admin" />}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem render={<Link href="/rejoin" />}>
                Log
              </DropdownMenuItem>
            </DropdownMenuContent>

            
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </header>
  );
}
