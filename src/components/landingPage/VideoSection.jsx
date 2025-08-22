"use client"

import API from "@/app/utils/axios";
import React, { useEffect, useState } from "react";

const VideoSection = () => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("/video/video.mp4");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMajorSection = async () => {
      try {
        const res = await API.get("/configurepage/majorsection");
        setVideoTitle(res.data.videoTitle);
        setVideoUrl(res.data.videoUrl);
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMajorSection();
  }, []);

  return (
    <>
      <div className={"video-section lg:p-3 p-2 lg:mt-20 md:mt-16 mt-8"}>
        <h2
          className={
            "lg:text-2xl md:text-xl text-lg text-white font-medium text-center"
          }
        >
          {loading ? "Loading..." : videoTitle}
        </h2>
      </div>

      <div className={" w-full bg-primary"}>
        <video
          className="w-full h-full"
          controls
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default VideoSection;
