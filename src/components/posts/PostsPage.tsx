"use client";

import React, { useMemo, useState } from "react";

type PostItem = {
  id: number;
  title: string;
  price: string;
  description: string;
  duration: string;
  includes: string[];
};

type Palette = {
  name: string;
  bg: string;
  card: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
};

type DesignPreset = {
  id: number;
  name: string;
  palette: Palette;
  styleType: number;
  cta: string;
  badge: string;
};

const palettes: Palette[] = [
  {
    name: "Ocean",
    bg: "linear-gradient(180deg, #f6fbff 0%, #eef5ff 100%)",
    card: "#ffffff",
    text: "#0d2342",
    muted: "#5b6e87",
    accent: "#1778f2",
    accentSoft: "#d7e8ff",
  },
  {
    name: "Sunset",
    bg: "linear-gradient(180deg, #fff7f1 0%, #fff1e7 100%)",
    card: "#ffffff",
    text: "#3a1f10",
    muted: "#805946",
    accent: "#ff6a3d",
    accentSoft: "#ffe3d8",
  },
  {
    name: "Leaf",
    bg: "linear-gradient(180deg, #f5fff8 0%, #edfff3 100%)",
    card: "#ffffff",
    text: "#133423",
    muted: "#4a7460",
    accent: "#13a463",
    accentSoft: "#dcf8ea",
  },
  {
    name: "Royal",
    bg: "linear-gradient(180deg, #f8f6ff 0%, #f1eeff 100%)",
    card: "#ffffff",
    text: "#24194f",
    muted: "#62588a",
    accent: "#6b4eff",
    accentSoft: "#e2dcff",
  },
  {
    name: "Berry",
    bg: "linear-gradient(180deg, #fff6fa 0%, #ffeef5 100%)",
    card: "#ffffff",
    text: "#4a1732",
    muted: "#87506a",
    accent: "#da2d7d",
    accentSoft: "#ffd7ea",
  },
  {
    name: "Mint",
    bg: "linear-gradient(180deg, #f2fffe 0%, #e8fffd 100%)",
    card: "#ffffff",
    text: "#103f44",
    muted: "#4f7a80",
    accent: "#0bb2c1",
    accentSoft: "#d1f8fc",
  },
  {
    name: "Amber",
    bg: "linear-gradient(180deg, #fffdf4 0%, #fff7df 100%)",
    card: "#ffffff",
    text: "#3f300e",
    muted: "#7c6840",
    accent: "#d7a100",
    accentSoft: "#fff0c3",
  },
  {
    name: "Coral",
    bg: "linear-gradient(180deg, #fff8f6 0%, #ffeeea 100%)",
    card: "#ffffff",
    text: "#451f17",
    muted: "#80544a",
    accent: "#ea5f3b",
    accentSoft: "#ffdcd2",
  },
  {
    name: "Steel",
    bg: "linear-gradient(180deg, #f7f8fa 0%, #edf0f5 100%)",
    card: "#ffffff",
    text: "#1b2738",
    muted: "#5b6a81",
    accent: "#3d5a80",
    accentSoft: "#dbe4f3",
  },
  {
    name: "Cherry",
    bg: "linear-gradient(180deg, #fff5f6 0%, #ffecee 100%)",
    card: "#ffffff",
    text: "#4d151e",
    muted: "#8d4f58",
    accent: "#e63946",
    accentSoft: "#ffd7dc",
  },
  {
    name: "Sky",
    bg: "linear-gradient(180deg, #f3faff 0%, #e6f4ff 100%)",
    card: "#ffffff",
    text: "#102f4d",
    muted: "#4f7191",
    accent: "#0a88e8",
    accentSoft: "#d4ecff",
  },
  {
    name: "Cocoa",
    bg: "linear-gradient(180deg, #fdf8f4 0%, #f7eee9 100%)",
    card: "#ffffff",
    text: "#3c2418",
    muted: "#6d5144",
    accent: "#b76c49",
    accentSoft: "#f5dfd3",
  },
];

const ctaOptions = [
  "Book Now",
  "Send Message",
  "Get Offer",
  "Call Today",
  "Reserve Slot",
  "Learn More",
  "Claim Discount",
  "Start Chat",
  "View Package",
  "Order Today",
];

const badgeOptions = [
  "Sponsored",
  "Popular",
  "Limited",
  "Best Seller",
  "Today Deal",
  "Top Rated",
  "Hot Offer",
  "Premium",
  "Editor Pick",
  "Trending",
];

const buildPresets = (): DesignPreset[] => {
  const total = 120;

  return Array.from({ length: total }, (_, index) => {
    const palette = palettes[index % palettes.length];

    return {
      id: index + 1,
      name: `FB Marketing ${index + 1}`,
      palette,
      styleType: index % 6,
      cta: ctaOptions[index % ctaOptions.length],
      badge: badgeOptions[index % badgeOptions.length],
    };
  });
};

const designPresets = buildPresets();

const postImages = [
  "/assets/images/posts/1.jpg",
  "/assets/images/posts/2.jpg",
  "/assets/images/posts/3.jpg",
  "/assets/images/posts/4.jpg",
  "/assets/images/posts/5.jpg",
  "/assets/images/posts/6.jpg",
];

type FeedItem = PostItem & {
  likes: string;
  comments: string;
  shares: string;
  imageSrc: string;
};

export default function PostsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const activePreset = designPresets[selectedTemplate];

  const shareToFacebook = (post: FeedItem) => {
    const pageUrl = window.location.href;
    const shareUrl = new URL("https://www.facebook.com/sharer/sharer.php");

    shareUrl.searchParams.set("u", pageUrl);
    shareUrl.searchParams.set(
      "quote",
      `${post.title} - ${post.description} | ${post.price}`,
    );

    window.open(shareUrl.toString(), "_blank", "noopener,noreferrer");
  };

  const feedItems = useMemo<FeedItem[]>(() => {
    return postsData.map((post, idx) => ({
      ...post,
      likes: `${(idx + 2) * 117}`,
      comments: `${(idx + 3) * 11}`,
      shares: `${(idx + 1) * 7}`,
      imageSrc: postImages[idx % postImages.length],
    }));
  }, []);

  const renderCard = (post: FeedItem) => {
    const p = activePreset.palette;

    const baseCardStyle: React.CSSProperties = {
      background: p.card,
      color: p.text,
      borderRadius: 18,
      border: `1px solid ${p.accentSoft}`,
      boxShadow: "0 10px 28px rgba(12, 32, 61, 0.08)",
      overflow: "hidden",
    };

    const topBand = (
      <div className="d-flex justify-content-between align-items-center p-3 pb-2">
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: p.accent,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            NX
          </div>
          <div>
            <p className="mb-0 fw-bold" style={{ color: p.text }}>
              NX Marketing Studio
            </p>
            <small style={{ color: p.muted }}>{activePreset.badge} • 2h</small>
          </div>
        </div>
        <span
          className="badge rounded-pill"
          style={{ background: p.accentSoft, color: p.accent }}
        >
          {post.duration}
        </span>
      </div>
    );

    const mediaBlock = (
      <div
        className="w-100 overflow-hidden"
        style={{
          height: 340,
          backgroundColor: p.accentSoft,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
        }}
      >
        <img
          src={post.imageSrc}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    );

    const footer = (
      <div className="px-3 pb-3 pt-2">
        <div
          className="d-flex justify-content-between mb-2"
          style={{ color: p.muted }}
        >
          <small>{post.likes} likes</small>
          <small>
            {post.comments} comments • {post.shares} shares
          </small>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm"
            style={{ background: p.accentSoft, color: p.accent, border: 0 }}
          >
            Like
          </button>
          <button
            type="button"
            className="btn btn-sm"
            style={{ background: p.accentSoft, color: p.accent, border: 0 }}
          >
            Comment
          </button>
          <button
            type="button"
            className="btn btn-sm ms-auto"
            style={{ background: p.accent, color: "#fff", border: 0 }}
          >
            {activePreset.cta}
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => shareToFacebook(post)}
            style={{
              background: "#1877f2",
              color: "#fff",
              border: 0,
            }}
          >
            Share to Facebook
          </button>
        </div>
      </div>
    );

    if (activePreset.styleType === 0) {
      return (
        <article key={post.id} className="mb-4" style={baseCardStyle}>
          {topBand}
          {mediaBlock}
          <div className="px-3 pb-3">
            <h5 className="fw-bold mb-1">{post.title}</h5>
            <p className="mb-2" style={{ color: p.muted }}>
              {post.description}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2 flex-wrap">
                {post.includes.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="badge rounded-pill"
                    style={{ background: p.accentSoft, color: p.accent }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <h4 className="mb-0 fw-bold" style={{ color: p.accent }}>
                {post.price}
              </h4>
            </div>
          </div>
          {footer}
        </article>
      );
    }

    if (activePreset.styleType === 1) {
      return (
        <article key={post.id} className="mb-4" style={baseCardStyle}>
          {topBand}
          {mediaBlock}
          <div
            className="p-3"
            style={{
              background: `linear-gradient(110deg, ${p.accentSoft} 0%, #ffffff 100%)`,
            }}
          >
            <h5 className="fw-bold mb-2">{post.title}</h5>
            <p className="mb-3" style={{ color: p.muted }}>
              {post.description}
            </p>
            <ul className="mb-3">
              {post.includes.map((feature) => (
                <li key={feature} style={{ color: p.muted }}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-semibold" style={{ color: p.muted }}>
                Limited slots this week
              </span>
              <h4 className="mb-0 fw-bold" style={{ color: p.accent }}>
                {post.price}
              </h4>
            </div>
          </div>
          {footer}
        </article>
      );
    }

    if (activePreset.styleType === 2) {
      return (
        <article key={post.id} className="mb-4" style={baseCardStyle}>
          {topBand}
          {mediaBlock}
          <div className="p-3">
            <div className="row g-3 align-items-center">
              <div className="col-8">
                <h5 className="fw-bold mb-2">{post.title}</h5>
                <p className="mb-2" style={{ color: p.muted }}>
                  {post.description}
                </p>
                <small style={{ color: p.muted }}>
                  Includes: {post.includes.join(" � ")}
                </small>
              </div>
              <div className="col-4">
                <div
                  className="text-center p-3"
                  style={{
                    background: p.accentSoft,
                    borderRadius: 12,
                    color: p.accent,
                  }}
                >
                  <p className="mb-1 fw-semibold">Start From</p>
                  <h5 className="mb-0 fw-bold">{post.price}</h5>
                </div>
              </div>
            </div>
          </div>
          {footer}
        </article>
      );
    }

    if (activePreset.styleType === 3) {
      return (
        <article key={post.id} className="mb-4" style={baseCardStyle}>
          {topBand}
          {mediaBlock}
          <div className="p-3" style={{ borderTop: `3px solid ${p.accent}` }}>
            <span
              className="badge mb-2"
              style={{ background: p.accent, color: "#fff" }}
            >
              Early Bird Offer
            </span>
            <h5 className="fw-bold mb-1">{post.title}</h5>
            <p className="mb-2" style={{ color: p.muted }}>
              {post.description}
            </p>
            <div className="d-flex gap-2 flex-wrap mb-2">
              {post.includes.map((feature) => (
                <span
                  key={feature}
                  className="badge"
                  style={{ background: p.accentSoft, color: p.accent }}
                >
                  {feature}
                </span>
              ))}
            </div>
            <h4 className="mb-0 fw-bold" style={{ color: p.accent }}>
              {post.price}
            </h4>
          </div>
          {footer}
        </article>
      );
    }

    if (activePreset.styleType === 4) {
      return (
        <article key={post.id} className="mb-4" style={baseCardStyle}>
          {topBand}
          {mediaBlock}
          <div className="p-3">
            <h5 className="fw-bold mb-2">{post.title}</h5>
            <p className="mb-3" style={{ color: p.muted }}>
              {post.description}
            </p>
            <div
              className="p-3 rounded-3 mb-3"
              style={{
                background: `linear-gradient(120deg, ${p.accentSoft} 0%, ${p.card} 100%)`,
              }}
            >
              <p className="mb-1 fw-semibold" style={{ color: p.text }}>
                Package Highlights
              </p>
              <p className="mb-0" style={{ color: p.muted }}>
                {post.includes.join(" | ")}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <small style={{ color: p.muted }}>
                Hurry up, offer may close soon
              </small>
              <h4 className="mb-0 fw-bold" style={{ color: p.accent }}>
                {post.price}
              </h4>
            </div>
          </div>
          {footer}
        </article>
      );
    }

    return (
      <article key={post.id} className="mb-4" style={baseCardStyle}>
        {topBand}
        {mediaBlock}
        <div className="p-3">
          <div
            className="p-3 rounded-3 mb-3"
            style={{ background: p.accent, color: "#fff" }}
          >
            <p className="mb-1">Boost Your Moments</p>
            <h5 className="mb-0 fw-bold">{post.title}</h5>
          </div>
          <p className="mb-2" style={{ color: p.muted }}>
            {post.description}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small style={{ color: p.muted }}>Includes:</small>
              <p className="mb-0 fw-semibold" style={{ color: p.text }}>
                {post.includes.slice(0, 2).join(", ")}
              </p>
            </div>
            <h4 className="mb-0 fw-bold" style={{ color: p.accent }}>
              {post.price}
            </h4>
          </div>
        </div>
        {footer}
      </article>
    );
  };

  return (
    <main
      className="min-vh-100 py-5"
      style={{ background: activePreset.palette.bg }}
    >
      <div className="container">
        <div className="text-center mb-4">
          <h1
            className="fw-bold mb-2"
            style={{ color: activePreset.palette.text }}
          >
            Facebook Marketing Post Studio
          </h1>
          <p className="mb-0" style={{ color: activePreset.palette.muted }}>
            120 ready post designs inspired by social media marketing layouts.
          </p>
        </div>

        <div
          className="mb-4 p-3 rounded-4"
          style={{
            background: "#ffffff",
            border: `1px solid ${activePreset.palette.accentSoft}`,
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h6
              className="mb-0 fw-bold"
              style={{ color: activePreset.palette.text }}
            >
              Choose Design Preset ({designPresets.length})
            </h6>
            <span
              className="badge"
              style={{
                background: activePreset.palette.accentSoft,
                color: activePreset.palette.accent,
              }}
            >
              Active: {activePreset.name}
            </span>
          </div>
          <div className="d-flex gap-2 overflow-auto pb-1">
            {designPresets.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => setSelectedTemplate(idx)}
                className="btn"
                style={{
                  whiteSpace: "nowrap",
                  minWidth: "132px",
                  borderRadius: 999,
                  border: `1px solid ${preset.palette.accent}`,
                  background:
                    selectedTemplate === idx ? preset.palette.accent : "#fff",
                  color:
                    selectedTemplate === idx ? "#fff" : preset.palette.accent,
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {feedItems.map((post) => renderCard(post))}
          </div>
        </div>
      </div>
    </main>
  );
}

export const postsData: PostItem[] = [
  {
    id: 1,
    title: "Single/Couple Person Photoshoot",
    price: "999/-",
    description: "Perfect for couples and individuals",
    duration: "2 Hours",
    includes: ["Digital Copies", "Editing", "Same Day Delivery"],
  },
  {
    id: 2,
    title: "Bridal Photoshoot",
    price: "1499/-",
    description: "Hourly bridal photography coverage",
    duration: "Hourly",
    includes: ["Professional Makeup", "Props", "Album"],
  },
  {
    id: 3,
    title: "Baby Outdoor Photoshoot",
    price: "1499/-",
    description: "Adorable moments with your little one",
    duration: "1.5 Hours",
    includes: ["Props", "Outfits", "30 Edited Photos"],
  },
  {
    id: 4,
    title: "Birthday Indoor/Outdoor",
    price: "2999/-",
    description: "Celebrate your special day",
    duration: "3 Hours",
    includes: ["Decorations", "Video", "150+ Photos"],
  },
  {
    id: 5,
    title: "Wedding Full Day Coverage",
    price: "Contact Us",
    description: "Complete wedding documentation",
    duration: "8-10 Hours",
    includes: ["2 Photographers", "Videography", "Album + Video"],
  },
  {
    id: 6,
    title: "Pre-Wedding Shoot",
    price: "2499/-",
    description: "Capture your love story",
    duration: "4 Hours",
    includes: ["Multiple Locations", "Outfit Changes", "Video Teaser"],
  },
  {
    id: 7,
    title: "Family Portrait Session",
    price: "1999/-",
    description: "Memories that last forever",
    duration: "2 Hours",
    includes: ["Indoor & Outdoor", "Props", "Prints"],
  },
  {
    id: 8,
    title: "Corporate Event Photography",
    price: "3999/-",
    description: "Professional event coverage",
    duration: "Full Event",
    includes: ["Candids", "Group Photos", "Quick Edits"],
  },
  {
    id: 9,
    title: "Maternity Photoshoot",
    price: "1299/-",
    description: "Celebrate motherhood",
    duration: "2 Hours",
    includes: ["Wardrobe Assistance", "Props", "Wall Canvas"],
  },
  {
    id: 10,
    title: "Product Photography",
    price: "2999/-",
    description: "Professional product shots",
    duration: "Per Session",
    includes: ["Multiple Angles", "Background Options", "Perfect Lighting"],
  },
];
