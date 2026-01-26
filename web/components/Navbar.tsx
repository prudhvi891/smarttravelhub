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
  const isTripDetail = pathname.startsWith("/trips/");

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------------- RESET ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setScrolled(false);
    setMenuOpen(false);
  }, [pathname]);

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    if (!(isHome || isContact || isAbout || isGallery || isTripDetail)) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, isContact, isAbout, isGallery, isTripDetail]);

  /* ---------------- NAVBAR STYLE ---------------- */
  const navbarClass =
    isHome || isContact || isAbout || isGallery || isTripDetail
      ? scrolled
        ? "bg-[#0B0F14]/90 backdrop-blur border-b border-white/10"
        : "bg-gradient-to-b from-black/60 to-transparent"
      : "bg-[#0B0F14] border-b border-white/10";

  const navItemClass =
    "relative cursor-pointer text-white/80 hover:text-white transition " +
    "after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 " +
    "after:bg-white/40 after:transition-all after:duration-300 " +
    "hover:after:w-full";

  /* ---------------- SECTION NAVIGATION ---------------- */
  const goToSection = (id: string) => {
    setMenuOpen(false);

    if (pathname === "/") {
      // same page → scroll + manually update hash
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${id}`);
      }
    } else {
      // different page → normal navigation
      router.push(`/#${id}`);
    }
  };

  const goHome = () => {
    setMenuOpen(false);

    if (pathname === "/") {
      // Already on home → scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Optional: clean hash if present
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }
    } else {
      // Not on home → navigate
      router.push("/");
    }
  };

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ease-out ${navbarClass}`}
    >
      {/* ================= DESKTOP / TOP BAR ================= */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={goHome}
          className="flex items-center cursor-pointer hover:opacity-90 transition"
        >
          {settings?.siteLogo ? (
            <img
              src={urlFor(settings.siteLogo).width(160).quality(90).url()}
              alt="Home"
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="font-semibold text-lg text-white">
              Smart Travel Hub
            </span>
          )}
        </button>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-white">
          <li>
            <button
              className={navItemClass}
              onClick={() => goToSection("tours")}
            >
              Tours
            </button>
          </li>
          <li>
            <Link href="/gallery" className={navItemClass}>
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
            <Link href="/about" className={navItemClass}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" className={navItemClass}>
              Contact
            </Link>
          </li>
        </ul>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          md:hidden
          absolute top-full left-0 w-full
          bg-[#0B0F14]/95 backdrop-blur
          border-t border-white/10
          transition-all duration-300
          ${
            menuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <ul className="flex flex-col px-6 py-6 gap-4 text-white text-sm">
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
              onClick={() => setMenuOpen(false)}
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
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={navItemClass}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
