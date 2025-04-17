import {
  calculateWaterLevel,
  getStatusBackground,
  getTimeBasedColorScheme,
  getWaterPhrase,
} from "@/lib/utils";
import React, { useState, useMemo, useEffect } from "react";
import WateringDatePopup from "./WateringDatePopup";

interface PlantBoxProps {
  index: number;
  id: string;
  imageUrl?: string;
  nickname?: string;
  plantType: string;
  lastWatered?: string;
  waterFrequency?: string;
  waterFreqDays?: number;
  waterLevel?: number;
  onPress: (id: number) => void;
  simulatedHour?: number | null;
}

const PlantBox: React.FC<PlantBoxProps> = ({
  index,
  id,
  imageUrl,
  nickname,
  plantType,
  lastWatered,
  waterFreqDays,
  onPress,
  simulatedHour = null,
}) => {
  const [showWateringPopup, setShowWateringPopup] = useState(false);
  const [localLastWatered, setLocalLastWatered] = useState(lastWatered);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute or use simulated time
  useEffect(() => {
    // If simulated hour is provided, set it directly
    if (simulatedHour !== null) {
      const simulatedDate = new Date();
      simulatedDate.setHours(simulatedHour, 0, 0, 0);
      setCurrentTime(simulatedDate);
      return; // Skip the real-time updates
    }

    // Real-time updates
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [simulatedHour]);

  const handleWateringSuccess = (newDate: string) => {
    setLocalLastWatered(newDate);
    setShowWateringPopup(false);
  };

  // Get time-based styling
  const colorScheme = useMemo(() => {
    return getTimeBasedColorScheme(currentTime);
  }, [currentTime]);

  const daysSinceWatering = useMemo(() => {
    if (!localLastWatered) return "N/A";

    const lastWateredDate = new Date(localLastWatered);
    const today = new Date();
    const diffTime = today.getTime() - lastWateredDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays.toString();
  }, [localLastWatered]);

  const waterLevel = useMemo(() => {
    if (!localLastWatered) return 100; // Default to 100% if no lastWatered date
    if (!waterFreqDays || waterFreqDays <= 0) return 0; // Handle invalid waterFreqDays
    return calculateWaterLevel(localLastWatered, waterFreqDays);
  }, [localLastWatered, waterFreqDays]);

  const waterPhrase = useMemo(() => {
    if (daysSinceWatering === "N/A") return "Not yet watered";
    return getWaterPhrase(waterLevel);
  }, [daysSinceWatering, waterLevel]);

  return (
    <div
      className={`w-full px-4 max-w-md aspect-square rounded-3xl flex flex-col cursor-pointer transition-transform hover:scale-105 relative  shadow-xl backdrop-blur-lg ${
        colorScheme.isNight ? "bg-white/15" : "bg-slate-500/20"
      } border border-white/10`}
      onClick={() => onPress(index)}
    >
      {/* Header with plant name */}
      <div className="pt-6 flex justify-between items-center">
        <h2 className={`text-4xl font-bold ${colorScheme.text}`}>
          {plantType}
        </h2>

        {/* Water Plant Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full text-sm font-medium shadow-md transition-all"
          onClick={(e) => {
            e.stopPropagation();
            setShowWateringPopup(true);
          }}
        >
          Water Plant
        </button>
      </div>

      {/* Plant image container with fixed aspect ratio */}
      <div className="py-4 flex-1 flex items-center">
        <div className="bg-white rounded-2xl w-full overflow-hidden shadow-md">
          <div className="relative pb-[56.25%]">
            {/* 16:9 aspect ratio container */}
            <img
              src={imageUrl}
              alt={nickname || plantType}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Water level bar */}
      <div className="pb-6">
        <div className="relative h-8 bg-gray-400/70 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 rounded-full"
            style={{ width: `${waterLevel}%` }}
          >
            <div className="h-full flex items-center px-4">
              <span className="font-bold text-white text-lg">
                {waterLevel}%
              </span>
            </div>
          </div>
        </div>

        {/* Watering info */}
        <div className="flex justify-center mt-4">
          <div
            className={`${getStatusBackground(
              waterLevel
            )} backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm`}
          >
            {daysSinceWatering === "N/A" ? (
              "Not yet watered"
            ) : (
              <p className="font-semibold">{waterPhrase}</p>
            )}
          </div>
        </div>
      </div>

      {/* Watering Date Popup */}
      {showWateringPopup && (
        <WateringDatePopup
          plantId={id}
          userId="1" // Hard-coded for now, should come from auth context
          onClose={() => setShowWateringPopup(false)}
          onSuccess={handleWateringSuccess}
        />
      )}
    </div>
  );
};

export default PlantBox;
