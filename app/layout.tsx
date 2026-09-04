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
    title: "Jaiswal Kirana & Co Dealers | Wholesale Inventory Catalogue",

    description: "Premium wholesale dealership catalogue in Nepal. Bulk distribution of Dragon, King's, and Big Chef sauces, ketchups, and mix jams.",

    keywords: ["Jaiswal Kirana", "wholesale dealers Nepal", "Dragon ketchup distributor", "kirana store supplier"],
 
    verification: {
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
