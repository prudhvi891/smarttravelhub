"use client";
import { useState } from "react";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    key: "overview",
    label: "Overview",
    icon: "📍",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    key: "itinerary",
    label: "Itinerary",
    icon: "🗺️",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    key: "inclusions",
    label: "Inclusions",
    icon: "✓",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    key: "exclusions",
    label: "Exclusions",
    icon: "✕",
    gradient: "from-orange-500 to-red-500",
  },
  {
    key: "additionalInfo",
    label: "Additional Info",
    icon: "ℹ️",
    gradient: "from-indigo-500 to-purple-500",
  },
];

// Universal Itinerary Parser - Works for ANY destination
function parseItinerary(text: string) {
  if (!text) return [];

  const lines = text.split("\n").filter((line) => line.trim());
  const days: any[] = [];
  let currentDay: any = null;
  let currentSection: any = null;

  lines.forEach((line) => {
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) return;

    // Detect DAY headers - supports multiple formats:
    // "🗓️ Day 1:", "Day 1:", "DAY 1 -", "Day 1 |", etc.
    const dayMatch = trimmed.match(
      /(?:🗓️\s*)?(?:Day|DAY)\s*(\d+)\s*[:\-|]\s*(.+)/i
    );
    if (dayMatch) {
      if (currentDay) days.push(currentDay);
      currentDay = {
        number: dayMatch[1],
        title: dayMatch[2].trim(),
        sections: [],
      };
      currentSection = null;
      return;
    }

    // Skip common header/footer lines (customize if needed)
    if (
      trimmed.match(/^[*#\-=]{3,}/) || // Decorative lines
      (trimmed.match(/PRESENTS|Package|Trip|Tour|Travel/i) &&
        trimmed.length < 50) || // Title lines
      trimmed.match(/^\d+\s*(Days?|Nights?)\s*\/\s*\d+\s*(Days?|Nights?)/) || // "3 Days / 2 Nights"
      (trimmed.match(/^(Pickup|Drop).*:/) && trimmed.length < 100) // Pickup/Drop info lines
    ) {
      return;
    }

    if (!currentDay) return; // Skip lines before first day

    // Detect SECTION headers - multi-language and format support
    const sectionPatterns = [
      /Activities/i,
      /Sightseeing/i,
      /Tour/i,
      /Visit/i,
      /Included/i,
      /Optional/i,
      /Meals?/i,
      /Stay/i,
      /Accommodation/i,
      /Check-?in/i,
      /Departure/i,
      /Arrival/i,
      /Transfer/i,
    ];

    const hasEmoji = trimmed.match(
      /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u
    );

    if (hasEmoji) {
      const restOfLine = trimmed
        .replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u, "")
        .trim();

      // Check if this is a section header
      const isSectionHeader =
        sectionPatterns.some((pattern) => pattern.test(restOfLine)) ||
        restOfLine.split(" ").length > 4; // Long text likely a header

      if (isSectionHeader) {
        currentSection = {
          title: trimmed,
          items: [],
        };
        currentDay.sections.push(currentSection);
        return;
      }
    }

    // Detect "Option 1", "Option A", "Choice 1" etc.
    const optionMatch = trimmed.match(
      /^(?:Option|Choice)\s*([A-Z\d]+)\s*[:\-]\s*(.+)/i
    );
    if (optionMatch) {
      currentSection = {
        title: trimmed,
        items: [],
      };
      currentDay.sections.push(currentSection);
      return;
    }

    // Everything else with emoji = activity item
    if (hasEmoji) {
      if (!currentSection) {
        // Create default section if none exists
        currentSection = { title: "", items: [] };
        currentDay.sections.push(currentSection);
      }
      currentSection.items.push(trimmed);
    }
    // Lines without emoji but under a section
    else if (currentSection && trimmed.length > 0) {
      // Add as plain text item (will be prefixed with a default emoji)
      currentSection.items.push("📌 " + trimmed);
    }
  });

  if (currentDay) days.push(currentDay);
  return days;
}

// Animated Itinerary Component - Universal for all destinations
function AnimatedItinerary({ trip }: any) {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  // Parse itinerary from PortableText or plain text
  let itineraryText = "";
  if (Array.isArray(trip.itinerary)) {
    itineraryText = trip.itinerary
      .map((block: any) => {
        if (block._type === "block" && block.children) {
          return block.children.map((child: any) => child.text).join(" ");
        }
        return "";
      })
      .join("\n");
  } else if (typeof trip.itinerary === "string") {
    itineraryText = trip.itinerary;
  }

  const days = parseItinerary(itineraryText);

  if (!days.length) {
    return <PortableTextRenderer value={trip.itinerary} />;
  }

  const dayColors = [
    "from-rose-400 to-pink-600",
    "from-violet-400 to-purple-600",
    "from-cyan-400 to-blue-600",
    "from-emerald-400 to-green-600",
    "from-amber-400 to-orange-600",
    "from-fuchsia-400 to-pink-600",
    "from-teal-400 to-cyan-600",
  ];

  return (
    <div className="space-y-6">
      {days.map((day, dayIndex) => {
        const isExpanded = expandedDay === dayIndex;
        const gradient = dayColors[dayIndex % dayColors.length];

        return (
          <motion.div
            key={dayIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: dayIndex * 0.15 }}
            className="relative"
          >
            {/* Timeline connector */}
            {dayIndex < days.length - 1 && (
              <div className="hidden md:block absolute left-8 top-20 w-1 h-full bg-gradient-to-b from-slate-300 to-transparent" />
            )}

            {/* Day Card */}
            <motion.div
              className={`relative overflow-hidden rounded-3xl transition-all duration-500 ${
                isExpanded ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedDay(isExpanded ? null : dayIndex)}
                className="w-full text-left"
              >
                <div
                  className={`relative bg-gradient-to-br ${gradient} p-6 md:p-8`}
                >
                  {/* Day number badge */}
                  <div className="flex items-start gap-4 md:gap-6">
                    <motion.div
                      animate={{ rotate: isExpanded ? 360 : 0 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-xl"
                    >
                      <div className="text-center">
                        <div className="text-xs md:text-sm font-bold text-white/80 uppercase tracking-wide">
                          Day
                        </div>
                        <div className="text-2xl md:text-3xl font-black text-white">
                          {day.number}
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                        {day.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                          {day.sections.reduce(
                            (acc: number, s: any) => acc + s.items.length,
                            0
                          )}{" "}
                          Activities
                        </span>
                      </div>
                    </div>

                    {/* Expand icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="p-6 md:p-8 space-y-6">
                      {day.sections.map(
                        (section: any, sectionIndex: number) => (
                          <motion.div
                            key={sectionIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            className="relative"
                          >
                            {/* Section Title */}
                            {section.title && (
                              <div className="flex items-center gap-3 mb-4">
                                <div
                                  className={`w-1 h-8 bg-gradient-to-b ${gradient} rounded-full`}
                                />
                                <h4 className="text-lg md:text-xl font-bold text-slate-800">
                                  {section.title}
                                </h4>
                              </div>
                            )}

                            {/* Section Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-0 md:ml-4">
                              {section.items.map(
                                (item: string, itemIndex: number) => {
                                  // Extract emoji (supports all unicode emojis)
                                  const emojiMatch = item.match(
                                    /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u
                                  );
                                  const emoji = emojiMatch
                                    ? emojiMatch[0]
                                    : "✨";
                                  const text = item.replace(
                                    /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*/u,
                                    ""
                                  );

                                  return (
                                    <motion.div
                                      key={itemIndex}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay:
                                          sectionIndex * 0.1 + itemIndex * 0.05,
                                      }}
                                      className="group"
                                    >
                                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-gradient-to-br hover:from-slate-100 hover:to-white transition-all duration-300 hover:shadow-md border border-slate-100">
                                        <span className="text-2xl flex-shrink-0 transform group-hover:scale-125 transition-transform duration-300">
                                          {emoji}
                                        </span>
                                        <span className="text-slate-700 leading-relaxed text-sm md:text-base pt-0.5">
                                          {text}
                                        </span>
                                      </div>
                                    </motion.div>
                                  );
                                }
                              )}
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function TripTabs({ trip }: any) {
  const [active, setActive] = useState("overview");

  // Debug: Log what's in the trip object (remove in production)
  console.log("Trip data:", trip);
  console.log("Additional Info:", trip.additionalInfo);

  const content = {
    overview: trip.overview ? (
      <PortableTextRenderer value={trip.overview} />
    ) : (
      <p className="text-slate-500 italic">No overview available</p>
    ),
    itinerary: <AnimatedItinerary trip={trip} />,
    inclusions:
      trip.inclusions && trip.inclusions.length > 0 ? (
        <motion.ul
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {trip.inclusions.map((i: string, idx: number) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 group"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                ✓
              </span>
              <span className="text-slate-700 leading-relaxed">{i}</span>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-slate-500 italic">No inclusions listed</p>
      ),
    exclusions:
      trip.exclusions && trip.exclusions.length > 0 ? (
        <motion.ul
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {trip.exclusions.map((i: string, idx: number) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 group"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                ✕
              </span>
              <span className="text-slate-700 leading-relaxed">{i}</span>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-slate-500 italic">No exclusions listed</p>
      ),
    additionalInfo: trip.additionalInfo ? (
  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
    {trip.additionalInfo}
  </p>
) : (
  <p className="text-slate-500 italic">No additional information available</p>
),

  };

  return (
    <>
      {/* ================= DESKTOP TABS ================= */}
      <div className="hidden md:block">
        <div className="relative mb-8 pb-1">
          {/* Base underline (always visible) */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-200" />

          <div className="flex gap-2 relative w-full">
            {tabs.map((t) => {
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className="relative flex-1 group"
                >
                  <div
                    className={`
                      relative px-6 py-4 rounded-t-2xl transition-all duration-300
                      ${
                        isActive
                          ? "bg-gradient-to-br " +
                            t.gradient +
                            " shadow-2xl -translate-y-1"
                          : "bg-white hover:bg-slate-50 hover:shadow-md"
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`text-2xl mb-1 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                    >
                      {t.icon}
                    </div>

                    {/* Label */}
                    <div
                      className={`
                        text-sm font-semibold transition-colors duration-300
                        ${isActive ? "text-white" : "text-slate-700 group-hover:text-slate-900"}
                      `}
                    >
                      {t.label}
                    </div>

                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none from-slate-400 to-slate-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`text-slate-700 leading-relaxed ${
              active === "itinerary"
                ? ""
                : "bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
            }`}
          >
            {content[active as keyof typeof content]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {tabs.map((t, index) => {
          const isActive = active === t.key;
          return (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden"
            >
              <button
                onClick={() => setActive(isActive ? "" : t.key)}
                className="w-full text-left"
              >
                <div
                  className={`
                    relative rounded-2xl transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-br " + t.gradient + " shadow-2xl"
                        : "bg-white shadow-md hover:shadow-xl"
                    }
                  `}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                      {/* Icon circle */}
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center text-2xl
                          transition-all duration-300
                          ${
                            isActive
                              ? "bg-white/20 backdrop-blur-sm shadow-lg scale-110"
                              : "bg-gradient-to-br " + t.gradient + " shadow-md"
                          }
                        `}
                      >
                        {t.icon}
                      </div>

                      {/* Label */}
                      <div
                        className={`
                          font-semibold text-lg transition-colors duration-300
                          ${isActive ? "text-white" : "text-slate-800"}
                        `}
                      >
                        {t.label}
                      </div>
                    </div>

                    {/* Chevron */}
                    <motion.svg
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-6 h-6 ${isActive ? "text-white" : "text-slate-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </div>

                  {/* Animated border on active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileTab"
                      className="absolute inset-0 rounded-2xl border-2 border-white/30"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              </button>

              {/* Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mt-3 ${t.key === "itinerary" ? "" : "bg-white rounded-2xl p-6 shadow-lg border border-slate-100"}`}
                    >
                      <div className="text-slate-700 leading-relaxed">
                        {content[t.key as keyof typeof content]}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
