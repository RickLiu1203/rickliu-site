"use client";

import { useEffect, useState } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function useScrambleText(targetText: string, duration: number = 3000) {
  const [displayText, setDisplayText] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const interval = 30; // Update every 30ms for smooth animation

    const scrambleInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        setDisplayText(targetText);
        setIsScrambling(false);
        clearInterval(scrambleInterval);
        return;
      }

      // Determine how many characters should be revealed
      const revealedCount = Math.floor(targetText.length * progress);

      const scrambled = targetText
        .split("")
        .map((char, index) => {
          // Keep spaces as spaces
          if (char === " ") return " ";

          // Reveal characters progressively from left to right
          if (index < revealedCount) {
            return char;
          }

          // Scramble the rest
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join("");

      setDisplayText(scrambled);
    }, interval);

    return () => clearInterval(scrambleInterval);
  }, [targetText, duration]);

  return { displayText, isScrambling };
}
