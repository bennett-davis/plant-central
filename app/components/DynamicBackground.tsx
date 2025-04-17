"use client";

import { useEffect, useState } from "react";
import { calculateSunPosition, isNighttime } from "@/lib/utils";

interface DynamicBackgroundProps {
  simulatedHour?: number | null;
}

const DynamicBackground = ({
  simulatedHour = null,
}: DynamicBackgroundProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNight, setIsNight] = useState(false);

  // Update time every minute or use simulated time
  useEffect(() => {
    // If simulated hour is provided, set it directly
    if (simulatedHour !== null) {
      const simulatedDate = new Date();
      simulatedDate.setHours(simulatedHour, 0, 0, 0);
      setCurrentTime(simulatedDate);
      setIsNight(isNighttime(simulatedHour));
      return; // Skip the real-time updates
    }

    // Real-time updates
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Check if it's night using the utility function
      const hour = now.getHours();
      setIsNight(isNighttime(hour));
    }, 60000);

    // Initial check
    const hour = new Date().getHours();
    setIsNight(isNighttime(hour));

    return () => clearInterval(timer);
  }, [simulatedHour]);

  // Generate random stars for night mode
  const generateStars = () => {
    const stars = [];
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2 + 1; // 1-3px
      const opacity = Math.random() * 0.8 + 0.2; // 0.2-1.0

      stars.push({
        id: i,
        size: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: opacity,
        animationDelay: `${Math.random() * 3}s`,
      });
    }

    return stars;
  };

  const sunPosition = calculateSunPosition(currentTime);
  const stars = generateStars();

  return (
    <>
      <div
        className={`fixed inset-0 transition-colors duration-1000 ${
          isNight ? "bg-[#000033]" : "bg-green-100"
        }`}
      />

      {/* Sun */}
      {!isNight && (
        <div
          className="fixed w-200 h-200 bg-yellow-200 rounded-full blur-3xl opacity-50"
          style={{
            left: sunPosition.left,
            top: sunPosition.top,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Stars */}
      {isNight &&
        stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: star.size,
              height: star.size,
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
    </>
  );
};

export default DynamicBackground;
