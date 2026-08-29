"use client";
import React, { useEffect, useState } from "react";
import VideoPlayerModal from "@/components/common/VideoPlayerModal";

type Video = {
  id: number;
  title: string;
  link: string;
};

export default function VideoSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        if (data.success) {
          setVideos(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    }
    fetchVideos();
  }, []);

  const handlePlay = (video: Video) => {
    setSelectedVideo(video);
    setIsOpen(true);
  };

  return (
    <>
      <section id="videos" className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
              Our Videos
            </h2>
          </div>
          <div className="row g-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="col-12 col-md-6 col-lg-3"
              >
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
                  onClick={() => handlePlay(video)}
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
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeId(
                        video.link
                      )}/hqdefault.jpg`}
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
                  <div style={{ padding: "12px" }}>
                    <h5
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: 0,
                        color: "#333",
                        lineHeight: 1.4,
                      }}
                    >
                      {video.title}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isOpen && selectedVideo && (
        <VideoPlayerModal
          video={selectedVideo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}

function getYouTubeId(url: string): string {
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
  return url;
}