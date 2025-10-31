"use client";

import { useEffect, useRef } from "react";

interface BoomerangVideoProps {
  src: string;
  alt?: string;
  className?: string;
  yOffset?: string;
}

export function BoomerangVideo({ src, alt, className, yOffset = "50%" }: BoomerangVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // If metadata is already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      loop
      muted
      autoPlay
      playsInline
      preload="auto"
      aria-label={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: `center ${yOffset}`
      }}
    />
  );
}
