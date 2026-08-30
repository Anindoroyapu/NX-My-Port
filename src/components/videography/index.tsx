"use client";
import React, { useEffect, useState } from "react";
import VideoPlayerModal from "@/components/common/VideoPlayerModal";

type Video = {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url?: string;
};

export default function Videography() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);
  const [autoPlayedId, setAutoPlayedId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        if (data.success) {
          const reversed = data.data.reverse();
          setVideos(reversed);
          if (reversed.length > 0) {
            setActiveVideoId(reversed[0].id);
            setAutoPlayedId(reversed[0].id); // track auto-played (will be muted)
          }
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    }
    fetchVideos();
  }, []);

  const handlePlay = (id: number) => {
    setActiveVideoId(id);
  };

  return (
    <>
      <section id="videos" className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2
              className="fw-bold"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              Our Videos
            </h2>
          </div>
          <div className="row g-3">
            {videos.map((video) => {
              const isPlaying = activeVideoId === video.id;
              return (
                <div key={video.id} className="col-12 col-md-6">
                  <div
                    className="video-card"
                    style={{
                      cursor: "pointer",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      background: "#fff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 30px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.12)";
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        paddingTop: "56.25%",
                        background: "#1a1a1a",
                      }}
                    >
                      {isPlaying ? (
                        isYouTubeUrl(video.video_url) ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(video.video_url)}?autoplay=1&mute=${autoPlayedId === video.id ? 1 : 0}&rel=0&enablejsapi=1`}
                            title={video.title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              border: "none",
                            }}
                          />
                        ) : isGoogleDriveUrl(video.video_url) ? (
                          <iframe
                            src={`https://drive.google.com/file/d/${getGoogleDriveId(video.video_url)}/preview`}
                            title={video.title}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              border: "none",
                            }}
                          />
                        ) : (
                          <video
                            src={video.video_url}
                            controls
                            autoPlay
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )
                      ) : (
                        <div
                          onClick={() => handlePlay(video.id)}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={getVideoThumbnail(video.video_url)}
                            alt={video.title}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            loading="lazy"
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.9)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <i
                              className="ri-play-fill"
                              style={{
                                color: "#e50914",
                                fontSize: "20px",
                                marginLeft: "3px",
                              }}
                            ></i>
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "4px 10px" }}>
                      <h5
                        className="line-clamp-1 overflow-ellipsis"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          marginBottom: 0,
                          color: "#333",
                          lineHeight: 1.4,
                          lineClamp: 1,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                        }}
                      >
                        {video.title}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

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

function getVideoThumbnail(url: string): string {
  if (isYouTubeUrl(url)) {
    const id = getYouTubeId(url);
    if (id) {
      // maxresdefault = 1280×720 (highest quality), fallback to hqdefault if not available
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }
  }
  if (isGoogleDriveUrl(url)) {
    const id = getGoogleDriveId(url);
    if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w1280`;
  }
  return "";
}
