"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Cabinet",
    href: "/cabinet",
  },
  { label: "Member Directory", href: "/members" },
  { label: "About MBA", href: "/about" },
  {
    label: "Office Bearers",
    href: "/office",
  },
  { label: "Events Gallery", href: "/events" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navRef = useRef(null);

  const toggleDropdown = (label) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full font-['Noto+Nastaliq+Urdu','Merriweather',serif]">
      {/* Top announcement bar */}
      <div className="hidden md:flex justify-center bg-primary  text-white text-xs  md:text-sm text-center py-1 md:py-1.5 px-4 tracking-wide">
        <p className="flex justify-center">
          Malir Bar Association, Karachi Sindh Pakistan
        </p>
        <div className="flex gap-2 md:hidden">
          <span className="flex gap-1 items-center">
            <FaEnvelope />
            info@malirbar.com
          </span>
          <span className="flex gap-1 items-center">
            <FaPhone /> 03107768226
          </span>
        </div>
      </div>

      {/* Brand + contact row */}
      <div className="bg-primary md:bg-surface md:border-b md:border-accent/30 px-4 md:px-10 py-2 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/">
              <Image
                src="/logo-1.png"
                width={60}
                height={60}
                alt="logo"
                className="md:w-[80px] md:h-[80px]"
              />
            </Link>

            <div className="hidden">
              <h1 className="text-secondary text-lg md:text-2xl font-bold tracking-tight leading-tight">
                Malir Bar Association
              </h1>
              <p className="text-primary text-[10px] md:text-xs font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase mt-0.5">
                Karachi · Pakistan
              </p>
            </div>
          </div>

          {/* Contact info */}
          <div className="hidden md:flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 text-sm">
            {/* Email */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-secondary text-[10px] md:text-sm" />
              </div>
              <div>
                <p className="hidden md:block text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
                  Email Address
                </p>
                <p className="text-foreground font-bold text-[11px] md:text-sm whitespace-nowrap">
                  info@malirbar.com
                </p>
              </div>
            </div>

            {/* Phone */}

            <div className="flex items-center gap-1.5 md:gap-2 pr-6">
              <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-primary text-[10px] md:text-sm" />
              </div>
              <div>
                <p className="hidden md:block text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
                  Phone Number
                </p>
                <p className="text-foreground font-bold text-[11px] md:text-sm whitespace-nowrap">
                  0310 7768226
                </p>
              </div>
            </div>
          </div>
          {/* Mobile hamburger */}
          <div className="flex md:hidden flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 text-sm">
            <button
              className="md:hidden ml-auto p-3 text-surface"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav ref={navRef} className="bg-white md:bg-primary md:shadow-md relative z-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-10 flex items-center justify-between md:justify-center">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1.5 px-4 py-4 text-white/90 text-sm font-medium tracking-wide
                                 hover:text-accent hover:bg-white/10 transition-all duration-200"
                    >
                      {item.label}
                      <FaChevronDown className="text-[10px] mt-0.5 group-hover:rotate-180 transition-transform duration-200" />
                    </button>

                    {/* Dropdown */}
                    <ul
                      className="absolute top-full left-0 min-w-[200px] bg-white border-t-2 border-accent
                                   shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                   translate-y-1 group-hover:translate-y-0 transition-all duration-200"
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-5 py-3 text-foreground text-sm font-medium
                                       border-b border-gray-100 last:border-0
                                       hover:bg-primary hover:text-white transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-4 text-white/90 text-sm font-medium tracking-wide
                               hover:text-accent hover:bg-white/10 transition-all duration-200
                               border-b-2 border-transparent hover:border-accent"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="p-3 md:hidden " />
          {/* Mobile hamburger */}
          {/* <button
            className="md:hidden ml-auto p-3 text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button> */}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-primary border-t border-white/10">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-white/90
                                   text-sm font-medium border-b border-white/10 hover:bg-white/10"
                      >
                        {item.label}
                        <FaChevronDown
                          className={`text-[10px] transition-transform duration-200 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <ul className="bg-foreground/20">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-8 py-3 text-white/80 text-sm border-b border-white/10
                                           hover:text-accent hover:bg-white/5"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-5 py-3.5 text-white/90 text-sm font-medium
                                 border-b border-white/10 hover:bg-white/10 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
