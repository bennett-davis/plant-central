import { calculateWaterLevel } from "@/lib/utils";
import React, { useState, useMemo } from "react";
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
}) => {
  const [showWateringPopup, setShowWateringPopup] = useState(false);
  const [localLastWatered, setLocalLastWatered] = useState(lastWatered);

  const markAsWatered = () => {
    setShowWateringPopup(true);
  };

  const handleWateringSuccess = (newDate: string) => {
    setLocalLastWatered(newDate);
    setShowWateringPopup(false);
  };

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

  // Determine the color of the water bar based on the water level
  const waterBarColor = useMemo(() => {
    if (waterLevel >= 90) return "bg-blue-700";
    if (waterLevel >= 80) return "bg-blue-600";
    if (waterLevel >= 70) return "bg-blue-500";
    if (waterLevel >= 60) return "bg-blue-400";
    if (waterLevel >= 50) return "bg-blue-300";
    if (waterLevel >= 40) return "bg-teal-400";
    if (waterLevel >= 30) return "bg-green-400";
    if (waterLevel >= 20) return "bg-yellow-400";
    if (waterLevel >= 10) return "bg-yellow-600";
    return "bg-amber-700"; // Past due (brown)
  }, [waterLevel]);

  return (
    <div
      className="w-full h-full aspect-square rounded-lg flex flex-col cursor-pointer transition-transform hover:scale-105 relative"
      onClick={() => onPress(index)}
    >
      {/* Water Plant Button */}
      <button
        className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded-md z-10 shadow-md transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setShowWateringPopup(true);
        }}
      >
        Water Plant
      </button>

      <div className="h-5/6 w-full relative">
        <img
          src={imageUrl}
          alt={nickname}
          className="w-full h-full object-fit rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-[#0000000] to-[#00000080]">
          <p className="text-white text-3xl italic font-bold ps-2">
            {plantType}
          </p>
        </div>
      </div>

      <div className="h-1/6 bg-gray-200 w-full rounded-b-lg relative overflow-hidden">
        {/* Water level bar */}
        <div
          className={`absolute top-0 left-0 h-full ${waterBarColor} transition-all duration-500`}
          style={{ width: `${waterLevel > 0 ? waterLevel : 100}%` }}
          onClick={markAsWatered}
        >
          {waterLevel ? (
            <p className="font-bold text-white text-center h-full flex items-center justify-center">
              {waterLevel}%
            </p>
          ) : (
            <p className="font-bold text-white text-center h-full flex items-center justify-center">
              Check on me!
            </p>
          )}
        </div>

        {/* Days since watering */}
        <div className="absolute bottom-1 right-2 text-xs z-10">
          <span className="font-medium text-gray-700 bg-white bg-opacity-70 px-1 py-0.5 rounded">
            {daysSinceWatering === "N/A"
              ? "N/A"
              : `${daysSinceWatering} days since watered / ${waterFreqDays} days`}
          </span>
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
