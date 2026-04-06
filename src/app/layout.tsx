import TemplateProvider from "@/contexts/TemplateProvider";
import "../styles/index.css";
import ComposeProviders from "@/lib/ComposeProviders";
import React from "react";
import "tailwindcss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ashaa.xyz"),
  title: {
    default: "Asha Lenscraft | Professional Photography Studio in Khulna",
    template: "%s | Asha Lenscraft",
  },
  description:
    "Asha Lenscraft — professional photography studio in Khulna, Bangladesh. Specializing in wedding, portrait, wildlife & fashion photography. Book your session today.",
  keywords: [
    "photography studio Khulna",
    "wedding photographer Bangladesh",
    "portrait photographer Khulna",
    "Asha Lenscraft",
    "Anindo Roy photographer",
    "wildlife photography Bangladesh",
    "fashion photography Khulna",
    "event photographer Khulna",
    "professional photographer BD",
  ],
  authors: [{ name: "Anindo Roy", url: "https://ashaa.xyz" }],
  creator: "Anindo Roy",
  publisher: "Asha Lenscraft",
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://ashaa.xyz",
    siteName: "Asha Lenscraft",
    title: "Asha Lenscraft | Professional Photography Studio in Khulna",
    description:
      "Capturing life's most meaningful moments with artistry and emotion. Wedding, portrait, wildlife & fashion photography in Khulna, Bangladesh.",
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
    title: "Asha Lenscraft | Professional Photography Studio in Khulna",
    description:
      "Capturing life's most meaningful moments with artistry and emotion.",
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
        "Professional photography studio specializing in wedding, portrait, wildlife and fashion photography in Khulna, Bangladesh.",
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
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.96",
        reviewCount: "100",
        bestRating: "5",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Photography Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Wedding Photography" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Portrait Photography" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Wildlife Photography" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Fashion Photography" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Event Photography" },
          },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": "https://ashaa.xyz/#person",
      name: "Anindo Roy",
      jobTitle: "Professional Photographer",
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
      </body>
    </html>
  );
}
