"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageUrl: window.location.href,
          referrer: document.referrer || "",
        }),
      }).catch(() => {});
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
