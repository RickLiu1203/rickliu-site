"use client";

import { useEffect, useRef, useState } from "react";

interface BoomerangVideoProps {
  src: string;
  alt?: string;
  className?: string;
  yOffset?: string;
}

export function BoomerangVideo({ src, alt, className, yOffset = "50%" }: BoomerangVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const handleLoadedMetadata = () => {
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // If metadata is already loaded
    if (video.readyState >= 2) {
      setIsLoading(false);
    }
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
          className="font-mono text-muted-foreground"
        >
          loading...
        </div>
      )}
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
          objectPosition: `center ${yOffset}`,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
