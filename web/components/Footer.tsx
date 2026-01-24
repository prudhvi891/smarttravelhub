"use client";

import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer({ settings }: any) {
  return (
    <footer className="bg-[#0B0F14] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* ================= BRAND ================= */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {settings?.siteTitle || "Smart Travel Hub"}
            </h3>

            <p className="text-sm leading-relaxed text-slate-400">
              We Create Everlasting Memories
            </p>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Tours", href: "/#tours" },
                { label: "Gallery", href: "/gallery" },
                { label: "Reviews", href: "/#reviews" },
                { label: "About Us", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="
                        relative inline-block
                        text-slate-400
                        transition-colors duration-300
                        hover:text-white
                        after:absolute after:left-0 after:-bottom-0.5
                        after:h-[1px] after:w-0
                        after:bg-white
                        after:transition-all after:duration-300
                        hover:after:w-full
                        "
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>

            <ul className="space-y-3 text-sm">
              {settings?.whatsappNumber && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white transition"
                  >
                    <FaWhatsapp className="text-green-500" />
                    {settings.whatsappNumber}
                  </a>
                </li>
              )}

              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 hover:text-white transition"
                  >
                    <FaEnvelope />
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* ================= SOCIAL ================= */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>

            <div className="flex gap-4">
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()}{" "}
          {settings?.siteTitle || "Smart Travel Hub"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
