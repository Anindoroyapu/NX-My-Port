"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import VisitorInfoModal from "./VisitorInfoModal";

export default function Tracker() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem("visitor_info_submitted");

    const pageTimer = setTimeout(() => {
      const savedInfo = localStorage.getItem("visitor_info");
      let extraData = {};
      if (savedInfo) {
        try {
          const parsed = JSON.parse(savedInfo);
          extraData = {
            name: parsed.name || null,
            email: parsed.email || null,
            phone: parsed.phone || null,
            location: parsed.location || null,
          };
        } catch {}
      }

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageUrl: window.location.href,
          referrer: document.referrer || "",
          ...extraData,
        }),
      }).catch(() => {});
    }, 1000);

    let modalTimer: ReturnType<typeof setTimeout>;
    if (!submitted) {
      modalTimer = setTimeout(() => {
        setShowModal(true);
      }, 8000);
    }

    return () => {
      clearTimeout(pageTimer);
      if (modalTimer) clearTimeout(modalTimer);
    };
  }, [pathname]);

  const handleVisitorSubmit = (data: { name: string; email: string; phone: string; location: string }) => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageUrl: window.location.href,
        referrer: document.referrer || "",
        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        location: data.location || null,
      }),
    }).catch(() => {});
  };

  return (
    <>
      <VisitorInfoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleVisitorSubmit}
      />
    </>
  );
}
