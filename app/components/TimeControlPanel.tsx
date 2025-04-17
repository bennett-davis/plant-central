"use client";

import { useState } from "react";

interface TimeControlPanelProps {
  onTimeChange: (hour: number | null) => void;
}

const TimeControlPanel = ({ onTimeChange }: TimeControlPanelProps) => {
  const [isTestMode, setIsTestMode] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const timePresets = [
    { label: "Dawn (6 AM)", hour: 6 },
    { label: "Morning (9 AM)", hour: 9 },
    { label: "Morning (10 AM)", hour: 10 },
    { label: "Morning (11 AM)", hour: 11 },
    { label: "Noon (12 PM)", hour: 12 },
    { label: "Afternoon (3 PM)", hour: 15 },
    { label: "Evening (6 PM)", hour: 18 },
    { label: "Night (9 PM)", hour: 21 },
    { label: "Midnight (12 AM)", hour: 0 },
    { label: "Late Night (3 AM)", hour: 3 },
  ];

  const handleTimePresetClick = (hour: number) => {
    setSelectedHour(hour);
    onTimeChange(hour);
  };

  const handleTestModeToggle = () => {
    const newMode = !isTestMode;
    setIsTestMode(newMode);

    // If turning off test mode, reset to real time
    if (!newMode) {
      setSelectedHour(null);
      onTimeChange(null);
    } else if (selectedHour !== null) {
      // If turning on test mode and a time was already selected, apply it
      onTimeChange(selectedHour);
    } else {
      // Default to noon when first enabling test mode
      setSelectedHour(12);
      onTimeChange(12);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-30 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Time Control Panel</h3>
        <div className="flex items-center">
          <span className="text-xs mr-2">
            {isTestMode ? "Test Mode" : "Real Time"}
          </span>
          <button
            onClick={handleTestModeToggle}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
              isTestMode ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isTestMode ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {isTestMode && (
        <div className="grid grid-cols-2 gap-2">
          {timePresets.map((preset) => (
            <button
              key={preset.hour}
              onClick={() => handleTimePresetClick(preset.hour)}
              className={`text-xs py-1 px-2 rounded ${
                selectedHour === preset.hour
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeControlPanel;
