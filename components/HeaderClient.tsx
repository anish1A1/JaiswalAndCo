
"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function HeaderClient({
  hasUser,
}: {
  hasUser: boolean;
}) {
  return (
    <header className="sticky top-0 z-200 w-full border-b border-[#E3E8E2]  backdrop-blur-md bg-emerald-500 group-hover:bg-emerald-500 shadow-md shadow-emerald-600/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1F5C3A] text-sm font-black text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            JS
          </span>

          <span className="hidden text-lg font-black tracking-tight text-[#173B2B] sm:block">
            JS Foods
          </span>
        </Link>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="group flex cursor-pointer items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3A]/30">
            <Avatar className="h-10 w-10 border-2 border-[#EAF3ED] bg-[#EAF3ED] transition-all duration-200 group-hover:border-[#CFE3D5] group-hover:bg-[#DDEFE3]">
              <AvatarFallback className="bg-transparent text-xs font-black text-[#1F5C3A]">
                JS
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="z-300 w-44 rounded-xl border border-[#E3E8E2] bg-white p-1.5 shadow-[0_12px_35px_rgba(23,59,43,0.12)]"
            >
              {hasUser ? (
                <DropdownMenuItem
                  render={<Link href="/admin" />}
                  className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-[#26352D] outline-none transition-colors hover:bg-[#EAF3ED] hover:text-[#1F5C3A] focus:bg-[#EAF3ED] focus:text-[#1F5C3A]"
                >
                  Profile
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  render={<Link href="/rejoin" />}
                  className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold text-[#26352D] outline-none transition-colors hover:bg-[#EAF3ED] hover:text-[#1F5C3A] focus:bg-[#EAF3ED] focus:text-[#1F5C3A]"
                >
                  Log In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </header>
  );
}