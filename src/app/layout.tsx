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
              <li className={(currentPath === "/counter" ? "nav-link-active" : "nav-link-inactive") + " nav-link"}><Link href="/counter">Counter</Link></li>
              <li className={(currentPath === "/temperature-converter" ? "nav-link-active" : "nav-link-inactive") + " nav-link"}><Link href="/temperature-converter">Temperature Converter</Link></li>
              <li className={(currentPath === "/flight-booker" ? "nav-link-active" : "nav-link-inactive") + " nav-link"}><Link href="/flight-booker">Flight Booker</Link></li>
              <li className={(currentPath === "/timer" ? "nav-link-active" : "nav-link-inactive") + " nav-link"}><Link href="/timer">Timer</Link></li>
              <li className={(currentPath === "/crud" ? "nav-link-active" : "nav-link-inactive") + " nav-link"}><Link href="/crud">CRUD</Link></li>
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
