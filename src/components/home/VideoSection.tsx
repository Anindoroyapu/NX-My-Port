"use client";
import React, { useEffect, useRef, useState } from "react";

type VideoItem = {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url?: string;
};

const localVideos: VideoItem[] = [
  { id: 11, title: "rec", video_url: "/videos/rec.mp4" },
  { id: 7, title: "WED Phomo 1", video_url: "/videos/WED Phomo 1.mp4" },
];

export default function VideoSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [viewsMap, setViewsMap] = useState<Record<number, number>>({});

  useEffect(() => {
    async function fetchViews() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        if (data.success) {
          const map: Record<number, number> = {};
          data.data.forEach((v: any) => {
            map[v.id] = v.views || 0;
          });

          // Autoplay video view increment on mount
          const autoplayId = localVideos[0]?.id;
          if (autoplayId) {
            map[autoplayId] = (map[autoplayId] || 0) + 1;
            fetch("/api/videos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: autoplayId }),
            }).catch((err) => console.error(err));
          }

          setViewsMap(map);
        }
      } catch (err) {
        console.error("Failed to fetch views:", err);
      }
    }
    fetchViews();
  }, []);

  const handleVideoPlay = async (id: number) => {
    // Optimistic UI update
    setViewsMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    try {
      await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to increment view:", err);
    }
  };

  return (
    <>
      <section
        id="videos"
        style={{
          background: "#0a0a0a",
          padding: "80px 0",
        }}
      >
        {/* Section heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <p
            style={{
              color: "#888",
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Asha Lenscraft
          </p>
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Our Work
          </h2>
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "linear-gradient(90deg, #c8a96e, #f0d090)",
              margin: "16px auto 0",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Video grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "auto auto",
            gap: "6px",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 16px",
          }}
          className="vid-grid"
        >
          {localVideos.map((video, idx) => (
            <VideoCard
              key={video.id}
              src={video.video_url}
              thumbnailUrl={video.thumbnail_url}
              isActive={activeIdx === idx}
              onActivate={() => setActiveIdx(idx)}
              onDeactivate={() => setActiveIdx(null)}
              isFirst={idx === 0}
              views={viewsMap[video.id] || 0}
              onPlay={() => handleVideoPlay(video.id)}
            />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .vid-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .vid-play-btn {
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .vid-card:hover .vid-play-btn {
          transform: translate(-50%, -50%) scale(1.12);
        }
        .vid-overlay {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .vid-card:hover .vid-overlay {
          opacity: 1;
        }
      `}</style>
    </>
  );
}

function VideoCard({
  src,
  thumbnailUrl,
  isActive,
  onActivate,
  onDeactivate,
  isFirst,
  views,
  onPlay,
}: {
  src: string;
  thumbnailUrl?: string;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  isFirst: boolean;
  views: number;
  onPlay: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(isFirst);

  const driveId = getGoogleDriveId(src);
  const ytId = getYouTubeId(src);
  const isYouTube = !!ytId;
  const directStreamUrl = getDirectStreamUrl(src);
  const thumbnail = thumbnailUrl || getVideoThumbnail(src);

  // Automatically play/pause based on isActive state (for native videos)
  React.useEffect(() => {
    if (!isYouTube) {
      if (isActive) {
        videoRef.current?.play().catch((err) => {
          console.log("Video play failed or blocked:", err);
        });
      } else {
        videoRef.current?.pause();
        if (videoRef.current) {
          videoRef.current.currentTime = 0; // reset to beginning when deactivated
        }
      }
    }
  }, [isActive, isYouTube]);

  const handlePlay = () => {
    setMuted(false); // Play with sound when manually clicked
    onActivate();
    onPlay();
  };

  const handlePause = () => {
    onDeactivate();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent pausing when toggling volume
    setMuted(!muted);
  };

  return (
    <div
      className="vid-card"
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        background: "#111",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        cursor: "pointer",
      }}
    >
      {/* 16:9 Video Box */}
      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          background: "#000",
        }}
        onClick={isActive ? handlePause : handlePlay}
      >
        {isActive && isYouTube ? (
          /* YouTube Embed Iframe */
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${muted ? 1 : 0}&rel=0`}
            title="Video Player"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              zIndex: 5,
            }}
          />
        ) : (
          /* Native HTML5 video player (Google Drive direct stream or raw URL) */
          <video
            ref={videoRef}
            src={directStreamUrl}
            preload="metadata"
            playsInline
            loop
            muted={muted}
            onCanPlay={() => setLoaded(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        {/* Overlay — visible when NOT playing */}
        {!isActive && (
          <div
            className="vid-overlay"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(160deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)",
              opacity: 1,
              zIndex: 2,
            }}
          />
        )}

        {/* Thumbnail Image — visible when NOT active */}
        {!isActive && thumbnail && (
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        {/* Gold shimmer bar at bottom when not playing */}
        {!isActive && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, #c8a96e, transparent)",
              opacity: 0.7,
              zIndex: 3,
            }}
          />
        )}

        {/* Play button — shown when not active */}
        {!isActive && (
          <div
            className="vid-play-btn"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.85)",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <i
              className="ri-play-fill"
              style={{
                color: "#fff",
                fontSize: "26px",
                marginLeft: "4px",
              }}
            />
          </div>
        )}

        {/* Mute/Unmute floating button when active */}
        {isActive && (
          <div
            onClick={toggleMute}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              zIndex: 10,
              cursor: "pointer",
            }}
          >
            <i
              className={muted ? "ri-volume-mute-fill" : "ri-volume-up-fill"}
              style={{ fontSize: "18px" }}
            />
          </div>
        )}

        {/* Loading state */}
        {!isYouTube && !loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#111",
              zIndex: 4,
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "2px solid rgba(200,169,110,0.3)",
                borderTop: "2px solid #c8a96e",
                borderRadius: "50%",
                animation: "vidspin 0.9s linear infinite",
              }}
            />
          </div>
        )}
      </div>

      {/* Views count display under the video */}
      <div
        style={{
          padding: "8px 16px",
          background: "#111",
          borderTop: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#aaa",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            fontFamily: "inherit",
          }}
        >
          <i
            className="ri-eye-line"
            style={{
              marginRight: "6px",
              fontSize: "14px",
              color: "#c8a96e",
            }}
          />
          {views} views
        </span>
      </div>
      <style>{`@keyframes vidspin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── Helper functions ─────────────────────────────────────── */

function getGoogleDriveId(url: string): string | null {
  const patterns = [
    /drive\.google\.com\/file\/d\/([^/?&]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/uc\?.*id=([^&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^/?]+)/,
    /youtube\.com\/shorts\/([^/?]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getDirectStreamUrl(url: string): string {
  const driveId = getGoogleDriveId(url);
  if (driveId) {
    return `https://drive.google.com/uc?export=download&id=${driveId}`;
  }
  return url;
}

function getVideoThumbnail(url: string): string {
  const driveId = getGoogleDriveId(url);
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280`;
  }
  const ytId = getYouTubeId(url);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
  }
  return "";
}
