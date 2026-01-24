"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToHash() {
  const params = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [params]);

  return null;
}
