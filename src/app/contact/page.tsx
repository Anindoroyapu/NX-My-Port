import Contact from "@/components/contact";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact | Book a Photography Session",
  description:
    "Get in touch with Asha Lenscraft to book your photography session. Call +880 1533 780593 or email anindoroy112@gmail.com. Located at KUET IT Park, Khulna.",
  alternates: { canonical: "https://ashaa.xyz/contact" },
  openGraph: {
    title: "Contact Asha Lenscraft | Book a Photography Session",
    description:
      "Ready to book? Reach us by phone, email or visit KUET IT Park, Khulna.",
    url: "https://ashaa.xyz/contact",
  },
};

export default function index() {
  return (
    <Wrapper>
      <Contact />
    </Wrapper>
  );
}
