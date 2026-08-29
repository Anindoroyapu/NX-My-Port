"use client";
import React, { useEffect, useRef } from "react";

type Video = {
  id: number;
  title: string;
  video_url: string;
};

type Props = {
  video: Video;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^/?]+)/,
    /(?:youtube\.com\/shorts\/)([^/?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isYouTubeUrl(url: string): boolean {
  return getYouTubeId(url) !== null;
}

function getGoogleDriveId(url: string): string | null {
  const patterns = [
    /(?:drive\.google\.com\/file\/d\/)([^/?]+)/,
    /(?:drive\.google\.com\/open\?id=)([^&]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isGoogleDriveUrl(url: string): boolean {
  return getGoogleDriveId(url) !== null;
}

export default function VideoPlayerModal({ video, isOpen, setIsOpen }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const youtubeId = getYouTubeId(video.video_url);
  const isYt = isYouTubeUrl(video.video_url);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) setIsOpen(false);
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => setIsOpen(false)}
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "36px",
          cursor: "pointer",
          zIndex: 10000,
          lineHeight: 1,
          padding: "10px",
        }}
      >
        <i className="ri-close-line"></i>
      </button>

      <div style={{ width: "100%", maxWidth: "1200px", padding: "0 20px" }}>
        {isYt && youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: "100vh",
              maxHeight: "calc(100vh - 80px)",
              border: "none",
              borderRadius: "8px",
            }}
          />
        ) : isGoogleDriveUrl(video.video_url) ? (
          <iframe
            src={`https://drive.google.com/uc?export=download&id=${getGoogleDriveId(video.video_url)}`}
            title={video.title}
            allow="autoplay"
            allowFullScreen
            style={{
              width: "100%",
              height: "100vh",
              maxHeight: "calc(100vh - 80px)",
              border: "none",
              borderRadius: "8px",
            }}
          />
        ) : (
          <video
            src={video.video_url}
            controls
            controlsList="nodownload"
            autoPlay
            style={{
              width: "100%",
              maxHeight: "calc(100vh - 80px)",
              borderRadius: "8px",
              background: "#000",
            }}
          />
        )}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#fff",
          maxWidth: "1200px",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: 600 }}>{video.title}</h3>
      </div>
    </div>
  );
}