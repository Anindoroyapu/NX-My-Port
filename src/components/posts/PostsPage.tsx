"use client";
import React from "react";
import Image from "next/image";

const img1 = "/assets/images/posts/1.jpg";
const img2 = "/assets/images/posts/2.jpg";
const img3 = "/assets/images/posts/3.jpg";
const img4 = "/assets/images/posts/4.jpg";
const img5 = "/assets/images/posts/5.jpg";
const img6 = "/assets/images/posts/6.jpg";

const styles: { [key: string]: React.CSSProperties } = {
  adContainer: {
    background: "linear-gradient(160deg, var(--bg-light), var(--bg-dark))",
    borderRadius: 15,
    maxWidth: 600,
    width: "100%",
    padding: "2rem 1.5rem 3rem 1.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    position: "relative",
    fontFamily: "var(--font-body)",
    backgroundColor: "#1a0d0c",
    color: "var(--text-light)",
  },
  photoGallery: {
    position: "relative",
    height: 300,
    marginBottom: "2rem",
  },
  photo: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 8,
    border: "1px solid #eee",
    boxShadow: "3px 3px 12px rgba(0, 0, 0, 0.4)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  offerDetails: {
    textAlign: "center",
    position: "relative",
    zIndex: 5,
  },
  mainOffer: {
    fontFamily: "var(--font-bengali)",
    fontSize: "3rem",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.2,
  },
  priceHighlight: {
    display: "inline-block",
    backgroundColor: "var(--accent)",
    color: "var(--text-dark)",
    padding: "0.2rem 1.5rem",
    margin: "0 0.5rem",
    borderRadius: 5,
    transform: "rotate(-2deg)",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
  },
  subOffer: {
    fontFamily: "var(--font-bengali)",
    fontSize: "1.5rem",
    margin: "0.5rem 0 2rem 0",
    opacity: 0.9,
  },
  packagesTitle: {
    fontFamily: "var(--font-script)",
    fontSize: "2.5rem",
    color: "#e0e0e0",
    margin: "1.5rem 0 1rem 0",
    position: "relative",
    display: "inline-block",
    zIndex: 1,
  },
  packagesTitleBefore: {
    content: "''",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%) rotate(-2deg) skewX(-15deg)",
    width: "120%",
    height: "60%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 5,
    zIndex: -1,
    pointerEvents: "none",
  },
  packageList: {
    listStyle: "none",
    padding: 0,
    margin: "2rem auto 0 auto",
    maxWidth: 480,
    textAlign: "left",
  },
  packageListItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    marginBottom: "0.75rem",
    borderRadius: 10,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    position: "relative",
  },
  packageListItemBefore: {
    content: "''",
    position: "absolute",
    left: 15,
    top: "50%",
    transform: "translateY(-50%)",
    width: 6,
    height: 6,
    backgroundColor: "var(--accent)",
    borderRadius: "50%",
    boxShadow: "0 0 8px var(--accent)",
  },
  packageListItemName: {
    fontWeight: 500,
    paddingLeft: "1.25rem",
    paddingRight: "1rem",
  },
  packageListItemPrice: {
    fontWeight: 700,
    color: "yellow",
    whiteSpace: "nowrap",
    fontSize: "1.1rem",
  },
  customPackageSection: {
    marginTop: "3rem",
    padding: "2rem 1.5rem",
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: 15,
  },
  customPackagePrompt: {
    fontSize: "1rem",
    opacity: 0.8,
    maxWidth: 400,
    margin: "0.5rem auto 1.5rem auto",
  },
  textarea: {
    width: "100%",
    maxWidth: 480,
    padding: "0.75rem",
    borderRadius: 8,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(0, 0, 0, 0.2)",
    color: "var(--text-light)",
    fontSize: "1rem",
    fontFamily: "var(--font-body)",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    display: "block",
    width: "100%",
    maxWidth: 480,
    margin: "1rem auto 0 auto",
    padding: "0.75rem",
    borderRadius: 8,
    border: "none",
    background: "var(--accent)",
    color: "var(--text-dark)",
    fontSize: "1.1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s, opacity 0.2s",
  },
  loading: {
    marginTop: "1.5rem",
    fontSize: "1rem",
    color: "var(--accent)",
  },
  error: {
    marginTop: "1.5rem",
    fontSize: "1rem",
    color: "#ff6b6b",
    background: "rgba(255, 107, 107, 0.1)",
    padding: "0.5rem",
    borderRadius: 5,
    border: "1px solid rgba(255, 107, 107, 0.3)",
    maxWidth: 480,
    margin: "1.5rem auto 0 auto",
  },
  generatedPackageCard: {
    marginTop: "2rem",
    padding: "1.5rem",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
    borderRadius: 10,
    border: "1px solid rgba(255, 255, 255, 0.15)",
    textAlign: "left",
    maxWidth: 480,
    margin: "2rem auto 0 auto",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  },
  generatedPackageTitle: {
    fontFamily: "var(--font-bengali)",
    fontSize: "1.75rem",
    color: "var(--accent)",
    marginBottom: "1rem",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "0.75rem",
  },
  generatedPackageDescription: {
    fontSize: "1rem",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    marginBottom: "1.5rem",
  },
  generatedPackagePrice: {
    fontSize: "1.5rem",
    fontWeight: 700,
    textAlign: "right",
    color: "#fff",
  },
};

// Photo positions and rotations
const photoStyles = [
  {
    top: 0,
    left: "15%",
    width: 130,
    height: 190,
    transform: "rotate(5deg)",
    zIndex: 2,
  },
  {
    top: 100,
    left: "2%",
    width: 140,
    height: 180,
    transform: "rotate(-2deg)",
    zIndex: 3,
  },
  {
    top: 5,
    right: "25%",
    width: 150,
    height: 110,
    transform: "rotate(-3deg)",
    zIndex: 1,
  },
  {
    top: 40,
    right: "-5%",
    width: 130,
    height: 190,
    transform: "rotate(10deg)",
    zIndex: 2,
  },
  {
    top: 120,
    left: "45%",
    transform: "translateX(-50%) rotate(-12deg)",
    width: 180,
    height: 220,
    zIndex: 4,
  },
  {
    top: 90,
    right: "12%",
    width: 150,
    height: 210,
    transform: "rotate(5deg)",
    zIndex: 3,
  },
];

const photos = [
  {
    url: img1,
    alt: "Indian Saree 1",
  },
  {
    url: img4,
    alt: "Indian Saree 2",
  },
  {
    url: img3,
    alt: "Indian Wedding",
  },
  {
    url: img2,
    alt: "Indian Clothing",
  },
  {
    url: img5,
    alt: "Indian Wedding 2",
  },
  {
    url: img6,
    alt: "Indian Saree 3",
  },
];

const packages = [
  { name: "Single/Couple Person Photoshoot", price: "999/-" },
  { name: "Bridal Photoshoot", price: "1499/-" },
  { name: "Baby Outdoor Photoshoot", price: "1499/-" },
  { name: "Birthday Indoor/Outdoor Photoshoot", price: "2999/-" },
  { name: "Wedding Full Day Coverage", price: "Message Us" },
];

export default function PostsPage() {
  return (
    <main style={styles.adContainer} className="mx-auto my-5">
      <section style={styles.photoGallery} className="position-relative mb-4">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            style={{
              ...styles.photo,
              ...photoStyles[idx],
              padding: 0,
              overflow: "hidden",
            }}
            className="rounded shadow position-absolute"
            onMouseOver={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                (photoStyles[idx].transform || "") +
                " scale(1.05) rotate(0deg)";
              (e.currentTarget as HTMLDivElement).style.zIndex = "10";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform =
                photoStyles[idx].transform || "";
              (e.currentTarget as HTMLDivElement).style.zIndex = String(
                photoStyles[idx].zIndex || 1
              );
            }}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 600px) 100vw, 600px"
              priority={idx === 0}
            />
          </div>
        ))}
      </section>

      <section style={styles.offerDetails} className="text-center">
        <h1 style={styles.mainOffer} className="fw-bold mb-2">
          মাত্র{" "}
          <span
            style={styles.priceHighlight}
            className="px-3 py-1 rounded bg-warning text-dark"
          >
            ৯৯৯
          </span>{" "}
          টাকায়
        </h1>
        <p style={styles.subOffer} className="mb-4">
          পাচ্ছেন আউটডোর ফটোগ্রাফি
        </p>
        <div style={{ position: "relative", display: "inline-block" }}>
          <span style={styles.packagesTitle} className="fs-2 font-marker">
            Our Other Packages
          </span>
          <span style={styles.packagesTitleBefore} />
        </div>
        <ul
          style={styles.packageList}
          className="list-unstyled mx-auto mt-1"
          aria-label="Photography Packages"
        >
          {packages.map((pkg, idx) => (
            <li
              key={idx}
              style={styles.packageListItem}
              className="d-flex justify-content-between align-items-center mb-1.5 position-relative"
            >
              <span style={styles.packageListItemName}>{pkg.name}</span>
              <span style={styles.packageListItemPrice}>{pkg.price}</span>
              <span
                style={{
                  ...styles.packageListItemBefore,
                  left: 15,
                  top: "50%",
                  position: "absolute",
                }}
              />
            </li>
          ))}
        </ul>
        <p>*Contact us for custom packages and group discounts!</p>
      </section>
    </main>
  );
}
