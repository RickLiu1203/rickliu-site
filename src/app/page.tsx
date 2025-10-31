"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Rick Liu";

    // Set construction emoji favicon
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = "48px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🚧", 32, 32);

      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = canvas.toDataURL();
      } else {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.href = canvas.toDataURL();
        document.head.appendChild(newFavicon);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center font-mono dark:bg-black bg-white text-black dark:text-white text-2xl">
      Under construction...
    </div>
  );
}
