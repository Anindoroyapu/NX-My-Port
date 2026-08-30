"use client";
import React, { useRef, useState } from "react";

type VideoItem = {
  src: string;
  poster?: string;
};

const videos: VideoItem[] = [
  { src: "/videos/WED Phomo 1.mp4" },
  { src: "/videos/rec.mp4" },
  { src: "/videos/ly6.mp4" },
  { src: "/videos/kiddo.mp4" },
];

export default function Videography() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <>
      <section
        id="videos"
        style={{
          background: "#0a0a0a",
          minHeight: "100vh",
          padding: "60px 0 80px",
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
          {videos.map((video, idx) => (
            <VideoCard
              key={idx}
              src={video.src}
              isActive={activeIdx === idx}
              onActivate={() => setActiveIdx(idx)}
              onDeactivate={() => setActiveIdx(null)}
              isFirst={idx === 0}
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

/* ─── Single Video Card ─────────────────────────────────── */
function VideoCard({
  src,
  isActive,
  onActivate,
  onDeactivate,
  isFirst,
}: {
  src: string;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  isFirst: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(isFirst);

  // Automatically play/pause based on isActive state
  React.useEffect(() => {
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
  }, [isActive]);

  const handlePlay = () => {
    setMuted(false); // Play with sound when manually clicked
    onActivate();
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
        position: "relative",
        paddingTop: "56.25%",
        background: "#111",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={isActive ? handlePause : handlePlay}
    >
      {/* Native video — always rendered, browser handles preload */}
      <video
        ref={videoRef}
        src={src}
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
            background: "linear-gradient(90deg, transparent, #c8a96e, transparent)",
            opacity: 0.7,
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
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
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

      <style>{`@keyframes vidspin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
