"use client";

import API from "@/app/utils/axios";
import React, { useEffect, useState } from "react";

const VideoSection = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMajorSection = async () => {
      try {
        const res = await API.get("/configurepage/majorsection");
        setVideoTitle(res.data.videoTitle);
        setVideoUrl(res.data.videoUrl);
      } catch (error) {
        console.error("Failed to fetch video data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajorSection();
  }, []);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    // youtu.be ফরম্যাট
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    // youtube.com ফরম্যাট
    if (url.includes("youtube.com/watch")) {
      const id = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return null;
  };

  const youtubeEmbed = getYoutubeEmbedUrl(videoUrl);

  return (
    <div className={"container mx-auto max-w-6xl px-3 lg:space-y-4 space-y-3 py-10"}>
      <h2 className="lg:text-4xl md:text-xl text-lg text-[#CC2127] font-bold text-center mb-5">
        {loading ? "Loading..." : videoTitle}
      </h2>

      <div className="w-full flex justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <iframe
            className="w-full h-[400px]"
            src={youtubeEmbed}
            title={videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
            <source src={videoUrl} type="video/mp4" />
          </iframe>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
