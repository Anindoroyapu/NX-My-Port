import BookingFormPage from "@/components/booking/BookingFormPage";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Book Now | Photography & Videography Session in Khulna",
  description:
    "Book your photography or videography session with Asha Lenscraft in Khulna — wedding, event, couple, single, outdoor & indoor shoots. Reserve your date with Anindo Roy today.",
  keywords: [
    "book photographer Khulna",
    "book videographer Khulna",
    "wedding photography booking Khulna",
    "event videography booking Khulna",
    "couple photoshoot booking Khulna",
    "outdoor photoshoot Khulna",
    "indoor studio booking Khulna",
  ],
  alternates: {
    canonical: "https://ashaa.xyz/booking",
  },
  openGraph: {
    title: "Book a Photography & Videography Session | Asha Lenscraft",
    description:
      "Reserve your wedding, event, couple, outdoor or indoor photography & videography session in Khulna, Bangladesh.",
    url: "https://ashaa.xyz/booking",
  },
};

const page = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <BookingFormPage />
    </Wrapper>
  );
};

export default page;
