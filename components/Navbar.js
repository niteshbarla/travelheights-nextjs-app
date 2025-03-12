"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 text-gray-900 py-2 px-4 fixed top-0 w-full z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/travel-heights_logo.png"
            alt="Site Logo"
            width={120}
            height={40}
            className="h-16 w-auto hover:opacity-80 transition-opacity"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Packages", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-gray-400"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden absolute top-full left-0 w-full bg-gray-100 shadow-md flex flex-col items-center space-y-4 py-4">
          {["Home", "Packages", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-gray-400"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
