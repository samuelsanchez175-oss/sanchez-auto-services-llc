"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { site } from "@/lib/site-content";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Hours & Location", href: "#hours" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainPhone = site.phones[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#111] shadow-lg" : "bg-[#111]/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-tight">
            <span className="text-white font-bold text-lg lg:text-xl tracking-tight">
              SANCHEZ AUTO
            </span>
            <span className="text-[oklch(0.52_0.22_27.325)] text-xs tracking-widest uppercase font-semibold">
              Services LLC
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA phone */}
          <a
            href={mainPhone.tel}
            className="hidden md:flex items-center gap-2 bg-[oklch(0.52_0.22_27.325)] hover:bg-[oklch(0.46_0.20_27)] text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
          >
            <Phone className="w-4 h-4" />
            {mainPhone.display}
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#111] border-t border-white/10 px-4 pb-5 pt-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-gray-300 hover:text-white font-medium border-b border-white/5"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={mainPhone.tel}
            className="flex items-center gap-2 mt-4 bg-[oklch(0.52_0.22_27.325)] text-white font-semibold px-4 py-3 rounded-md justify-center"
          >
            <Phone className="w-4 h-4" />
            {mainPhone.display}
          </a>
        </div>
      )}
    </header>
  );
}
