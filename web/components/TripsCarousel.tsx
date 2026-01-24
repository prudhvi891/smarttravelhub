"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import TripCard from "@/components/TripCard";

export default function TripsCarousel({ trips }: { trips: any[] }) {
  const swiperRef = useRef<any>(null);

  return (
    <div className="relative group">
      {/* LEFT ARROW */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="
          hidden md:flex
          absolute -left-14 top-1/2 -translate-y-1/2
          z-30
          h-10 w-10 items-center justify-center
          rounded-full bg-white shadow-md
          text-slate-700 text-2xl
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="
          hidden md:flex
          absolute -right-14 top-1/2 -translate-y-1/2
          z-30
          h-10 w-10 items-center justify-center
          rounded-full bg-white shadow-md
          text-slate-700 text-2xl
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        ›
      </button>

      {/* SWIPER */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: ".trips-pagination",
          clickable: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1.1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {trips.map((trip) => (
          <SwiperSlide key={trip._id}>
            <TripCard trip={trip} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PAGINATION */}
      <div className="trips-pagination mt-8 flex justify-center relative z-10" />
    </div>
  );
}
