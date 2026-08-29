import TemplateProvider from "@/contexts/TemplateProvider";
import "../styles/index.css";
import ComposeProviders from "@/lib/ComposeProviders";
import React from "react";
import "tailwindcss";
import type { Metadata } from "next";
import Tracker from "@/components/Tracker";
import FirstVisitModal from "@/components/common/FirstVisitModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://ashaa.xyz"),
  title: {
    default:
      "Asha Lenscraft | Photography & Videography Studio in Khulna",
    template: "%s | Asha Lenscraft",
  },
  description:
    "Asha Lenscraft — Khulna's photography & videography studio. Wedding, event, couple, single, outdoor & indoor photography and videography in Khulna, Bangladesh. Book your session today.",
  keywords: [
    // Core services in Khulna (English)
    "photography Khulna",
    "videography Khulna",
    "photographer in Khulna",
    "videographer in Khulna",
    "photography studio Khulna",
    "wedding photography Khulna",
    "wedding videography Khulna",
    "event photography Khulna",
    "event videography Khulna",
    "couple photography Khulna",
    "couple photoshoot Khulna",
    "pre wedding photography Khulna",
    "single portrait photography Khulna",
    "solo photoshoot Khulna",
    "outdoor photography Khulna",
    "outdoor photoshoot Khulna",
    "indoor photography Khulna",
    "indoor studio photoshoot Khulna",
    "portrait photographer Khulna",
    "fashion photography Khulna",
    "wildlife photography Bangladesh",
    "cinematography Khulna",
    "birthday photographer Khulna",
    "professional photographer Khulna",
    "professional videographer Khulna",
    "best photographer in Khulna",
    "photo studio near me Khulna",
    // Brand
    "Asha Lenscraft",
    "Anindo Roy photographer",
    "Anindo Roy videographer",
    // Bengali / local search terms
    "খুলনা ফটোগ্রাফি",
    "খুলনা ভিডিওগ্রাফি",
    "খুলনা ফটোগ্রাফার",
    "খুলনা বিয়ের ফটোগ্রাফি",
    "খুলনা ইভেন্ট ফটোগ্রাফি",
    "খুলনা কাপল ফটোশুট",
    "খুলনা আউটডোর ফটোশুট",
    "খুলনা ইনডোর ফটোশুট",
  ],
  authors: [{ name: "Anindo Roy", url: "https://ashaa.xyz" }],
  creator: "Anindo Roy",
  publisher: "Asha Lenscraft",
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://ashaa.xyz",
    siteName: "Asha Lenscraft",
    title: "Asha Lenscraft | Photography & Videography Studio in Khulna",
    description:
      "Wedding, event, couple, single, outdoor & indoor photography and videography in Khulna, Bangladesh. Capturing life's most meaningful moments with artistry and emotion.",
    images: [
      {
        url: "/assets/images/projects/asha-main.jpg",
        width: 1200,
        height: 630,
        alt: "Asha Lenscraft Photography Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asha Lenscraft | Photography & Videography Studio in Khulna",
    description:
      "Wedding, event, couple, outdoor & indoor photography and videography in Khulna, Bangladesh.",
    images: ["/assets/images/projects/asha-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://ashaa.xyz/#business",
      name: "Asha Lenscraft",
      description:
        "Professional photography and videography studio specializing in wedding, event, couple, single, outdoor and indoor photography and videography in Khulna, Bangladesh.",
      url: "https://ashaa.xyz",
      telephone: "+8801533780593",
      email: "anindoroy112@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "KUET IT Park, KUET",
        addressLocality: "Khulna",
        addressCountry: "BD",
      },
      image: "https://ashaa.xyz/assets/images/projects/asha-main.jpg",
      sameAs: ["https://www.facebook.com/anindoroy441/"],
      areaServed: {
        "@type": "City",
        name: "Khulna",
      },
      knowsAbout: [
        "Wedding Photography",
        "Wedding Videography",
        "Event Photography",
        "Event Videography",
        "Couple Photoshoot",
        "Portrait Photography",
        "Outdoor Photography",
        "Indoor Studio Photography",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.96",
        reviewCount: "100",
        bestRating: "5",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Photography & Videography Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Wedding Photography",
              areaServed: "Khulna",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Wedding Videography",
              areaServed: "Khulna",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Event Photography & Videography",
              areaServed: "Khulna",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Couple & Pre-Wedding Photoshoot",
              areaServed: "Khulna",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Single / Portrait Photography",
              areaServed: "Khulna",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Outdoor Photography & Videography",
              areaServed: "Khulna",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Indoor Studio Photography",
              areaServed: "Khulna",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Fashion Photography" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Wildlife Photography" },
          },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": "https://ashaa.xyz/#person",
      name: "Anindo Roy",
      jobTitle: "Professional Photographer & Videographer",
      worksFor: { "@id": "https://ashaa.xyz/#business" },
      url: "https://ashaa.xyz",
      sameAs: ["https://www.facebook.com/anindoroy441/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://ashaa.xyz/#website",
      url: "https://ashaa.xyz",
      name: "Asha Lenscraft",
      publisher: { "@id": "https://ashaa.xyz/#business" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Permanent+Marker&family=Rammetto+One&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ComposeProviders components={[TemplateProvider]}>
          <main>{children}</main>
        </ComposeProviders>
        <Tracker />
        <FirstVisitModal />
      </body>
    </html>
  );
}
