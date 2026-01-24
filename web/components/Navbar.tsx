"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { urlFor } from "@/lib/sanity.image";

export default function Navbar({ settings }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";
  const isAbout = pathname === "/about";
  const isGallery = pathname === "/gallery";
  const [scrolled, setScrolled] = useState(false);
  const isTripDetail = pathname.startsWith("/trips/");

  const navItemClass =
  "relative cursor-pointer transition-all duration-200 " +
  "text-white/80 hover:text-white " +
  "after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 " +
  "after:bg-white/40 after:transition-all after:duration-300 " +
  "hover:after:w-full";



  /* ✅ RESET SCROLL STATE ON ROUTE CHANGE */
  useEffect(() => {
    setScrolled(false);
  }, [pathname]);

  /* EXISTING EFFECT — KEEP AS IS */
  useEffect(() => {
    if (!(isHome || isContact || isAbout || isGallery || isTripDetail)) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, isContact, isAbout || isGallery || isTripDetail]);

  const navbarClass =
    isHome || isContact || isAbout || isGallery || isTripDetail
      ? scrolled
        ? "bg-[#0B0F14]/90 backdrop-blur border-b border-white/10"
        : "bg-gradient-to-b from-black/60 to-transparent"
      : "bg-[#0B0F14] border-b border-white/10";

  // 🔑 ONE FUNCTION TO RULE ALL NAVIGATION
  const goToSection = (id: string) => {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ease-out ${navbarClass}`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO → HOME */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center cursor-pointer select-none hover:opacity-90 transition"
        >
          {settings?.siteLogo ? (
            <img
              src={urlFor(settings.siteLogo).width(160).quality(90).url()}
              alt="Home"
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="font-semibold text-lg">Home</span>
          )}
        </button>

        {/* MENU */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
          <li>
            <button
              className={navItemClass}
              onClick={() => goToSection("tours")}
            >
              Tours
            </button>
          </li>
          <li>
            <Link
              href="/gallery"
              className={navItemClass}
            >
              Gallery
            </Link>
          </li>
          <li>
            <button
              className={navItemClass}
              onClick={() => goToSection("reviews")}
            >
              Reviews
            </button>
          </li>
         <li>
            <Link
              href="/about"
              className={navItemClass}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={navItemClass}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile */}
        <button className="md:hidden text-2xl text-white">☰</button>
      </nav>
    </header>
  );
}
