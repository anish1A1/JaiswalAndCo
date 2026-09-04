import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
title: "Jaiswal Kirana & Co Dealers | Premium Wholesale Catalog",
  description: "Explore our real-time wholesale dealership inventory layers including Dragon, King's, and Big Chef premium items.",  verification: {
    google:"eIutQj9B8fwSleVlq_be0U6xiuud4krIz1rCYbVRmg4",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-gray-400 min-h-full flex flex-col">
        
        {children}</body>
    </html>
  );
}
