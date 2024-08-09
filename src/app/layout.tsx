'use client'

import './globals.css'
import Link from 'next/link'
import { usePathname} from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname()
  return (
    <html lang="en">
      <body>
      <div className="flex justify-center mt-8">
        <div className="w-[60rem] mx-auto">
          <div className="w-[19rem] float-left pr-8">
            <ul>
              <li className={(currentPath === "/counter" ? "font-semibold bg-blue-300" : "text-black") + " py-2 px-4 hover:bg-gray-100"}><Link href="/counter">Counter</Link></li>
              <li className={(currentPath === "/temperature-converter" ? "font-semibold bg-blue-300" : "text-black") + " py-2 px-4 hover:bg-gray-100"}><Link href="/temperature-converter">Temperature Converter</Link></li>
              <li className={(currentPath === "/flight-booker" ? "font-semibold bg-blue-300" : "text-black") + " py-2 px-4 hover:bg-gray-100"}><Link href="/flight-booker">Flight Booker</Link></li>
              <li className={(currentPath === "/timer" ? "font-semibold bg-blue-300" : "text-black") + " py-2 px-4 hover:bg-gray-100"}><Link href="/timer">Timer</Link></li>
              <li className={(currentPath === "/crud" ? "font-semibold bg-blue-300" : "text-black") + " py-2 px-4 hover:bg-gray-100"}><Link href="/crud">CRUD</Link></li>
            </ul>
          </div>
          <div className="w-[41rem] ml-[19rem]">
            {children}
          </div>
        </div>
      </div>
      </body>
    </html>
  );
}
