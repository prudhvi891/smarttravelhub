"use client";

import { useState } from "react";
import PortableTextRenderer from "@/components/PortableTextRenderer";

const tabs = [
  "overview",
  "itinerary",
  "inclusions",
  "exclusions",
  "additionalInfo",
] as const;

function portableTextToPlainText(value: any): string {
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n");
}

function parseItinerary(value: any) {
  const text = portableTextToPlainText(value);
  if (!text) return [];

  const dayBlocks = text.split(/(?=Day\s+\d+:)/g);

  return dayBlocks.map((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const title = lines.shift(); // "Day X: ..."

    return {
      title,
      items: lines,
    };
  });
}


export default function TripTabs({ trip }: any) {
  const [active, setActive] = useState<(typeof tabs)[number]>("overview");

  const renderContent = () => {
    switch (active) {
      case "overview":
        return <PortableTextRenderer value={trip.overview} />;

      case "itinerary":
        const days = parseItinerary(trip.itinerary);

        return (
          <div className="relative pl-6 space-y-10">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-slate-200" />

            {days.map((day, idx) => (
              <div key={idx} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="relative z-10">
                  <div className="h-4 w-4 rounded-full bg-slate-900 mt-1" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    {day.title}
                  </h4>

                  <ul className="space-y-2 text-slate-700">
                    {day.items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-slate-400">–</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        );

      case "inclusions":
        return (
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            {trip.inclusions?.map((i: string, idx: number) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        );

      case "exclusions":
        return (
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            {trip.exclusions?.map((i: string, idx: number) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        );

      case "additionalInfo":
        return <PortableTextRenderer value={trip.additionalInfo} />;
    }
  };

  return (
    <div>
      {/* TAB NAV */}
      <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-3 text-sm font-medium capitalize transition cursor-pointer ${
              active === tab
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="text-slate-700 leading-relaxed">{renderContent()}</div>
    </div>
  );
}
