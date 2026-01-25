"use client";

import { useState } from "react";
import PortableTextRenderer from "@/components/PortableTextRenderer";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "inclusions", label: "Inclusions" },
  { key: "exclusions", label: "Exclusions" },
  { key: "additionalInfo", label: "Additional Info" },
];

export default function TripTabs({ trip }: any) {
  const [active, setActive] = useState("overview");

  const content = {
    overview: <PortableTextRenderer value={trip.overview} />,
    itinerary: <PortableTextRenderer value={trip.itinerary} />,
    inclusions: (
      <ul className="list-disc pl-5 space-y-2">
        {trip.inclusions?.map((i: string, idx: number) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    ),
    exclusions: (
      <ul className="list-disc pl-5 space-y-2">
        {trip.exclusions?.map((i: string, idx: number) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    ),
    additionalInfo: <PortableTextRenderer value={trip.additionalInfo} />,
  };

  return (
    <>
      {/* ================= DESKTOP TABS ================= */}
      <div className="hidden md:block">
        <div className="flex gap-8 border-b border-slate-200 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`pb-3 text-sm font-medium ${
                active === t.key
                  ? "border-b-2 border-slate-900 text-slate-900"
                  : "text-slate-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="text-slate-700 leading-relaxed">
          {content[active as keyof typeof content]}
        </div>
      </div>

      {/* ================= MOBILE ACCORDION ================= */}
      <div className="md:hidden space-y-4">
        {tabs.map((t) => (
          <details
            key={t.key}
            className="border border-slate-200 rounded-xl p-4"
          >
            <summary className="font-semibold cursor-pointer">
              {t.label}
            </summary>
            <div className="mt-3 text-sm text-slate-700">
              {content[t.key as keyof typeof content]}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
