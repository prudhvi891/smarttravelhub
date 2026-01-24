"use client";

import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

type TripCardProps = {
  trip: any;
};

export default function TripCard({ trip }: TripCardProps) {
  const startingPrice = trip.pricing?.length
    ? Math.min(...trip.pricing.map((p: any) => p.price))
    : null;

  return (
    <Link
      href={`/trips/${trip.slug.current}`}
      className="
            block h-full
            bg-white text-[#0B0F14]
            rounded-xl overflow-hidden
            shadow-sm
            transition-all duration-300 ease-out
            hover:-translate-y-1
            hover:shadow-xl

            [&:hover_img]:scale-105
        "
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        {trip.heroImage && (
          <img
            src={urlFor(trip.heroImage).width(600).height(360).url()}
            alt={trip.title}
            className="
                h-full w-full object-cover
                transition-transform duration-500 ease-out
            "
          />
        )}

        {trip.status === "soldout" && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
            Sold Out
          </span>
        )}

        {trip.featured && (
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}

         {trip.hasOffer && (
          <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Special Offer
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col justify-between min-h-[190px]">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-2">{trip.title}</h3>

          <p className="text-sm text-gray-600">
            {trip.location}
            {trip.duration && ` • ${trip.duration}`}
          </p>

          {trip.shortDescription && (
            <p className="text-sm text-gray-700 line-clamp-2">
              {trip.shortDescription}
            </p>
          )}
        </div>

        <div className="mt-3">
          {trip.tripGroup === "bulk" && trip.bulkSize && (
            <p className="text-xs font-medium text-indigo-600 mb-1">
              Group Size: {trip.bulkSize}
            </p>
          )}

          {startingPrice && (
            <p className="font-semibold">Starting at ₹{startingPrice}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
