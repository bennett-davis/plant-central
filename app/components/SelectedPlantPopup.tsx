"use client";
import { calculateWaterLevel } from "@/lib/utils";
import { Plant } from "@/types/plant";
import React, { useMemo } from "react";

interface SelectedPlantPopupProps {
  plant: Plant;
  onClose: () => void;
}

export const SelectedPlantPopup = ({
  plant,
  onClose,
}: SelectedPlantPopupProps) => {
  const { lastWatered, waterFreqDays } = plant;

  const waterLevel = useMemo(() => {
    if (!lastWatered) return 100; // Default to 100% if no lastWatered date
    if (!waterFreqDays || waterFreqDays <= 0) return 0; // Handle invalid waterFreqDays
    return calculateWaterLevel(lastWatered, waterFreqDays);
  }, [lastWatered, waterFreqDays]);

  const wateredDays = useMemo(() => {
    if (!lastWatered) return "N/A";
    const lastWateredDate = new Date(lastWatered);
    const today = new Date();
    const diffTime = today.getTime() - lastWateredDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays.toString();
  }, [lastWatered]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/35 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-300/60 backdrop-blur-3xl rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <>
          {/* Hero section with plant image */}
          <div className="h-60 md:h-72 w-full relative bg-gradient-to-r from-green-700 to-emerald-500">
            <img
              src={plant.imageUrl}
              alt={plant.plantType}
              className="w-full h-full object-cover opacity-80"
            />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-3xl font-bold text-white">
                {plant.plantType}
              </h2>
              <p className="text-white/80 text-lg">{plant.nickname}</p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md hover:bg-white transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content section */}
          <div className="px-4 pt-4">
            {/* Water information cards */}
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
              {/* Water level card */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Water Level
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14.5v4a2 2.5 0 01-2 2.5H7a2 2.5 0 01-2-2.5v-4m14-5l-5-5-5 5M12 4.5v10"
                      />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-blue-800">
                    {waterLevel}%
                  </span>
                </div>

                {/* Water level progress bar */}
                <div className="mt-2 bg-white rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${waterLevel}%` }}
                  />
                </div>
              </div>

              {/* Last watered card */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Last Watered
                </h3>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-blue-800">
                      {wateredDays} days ago
                    </span>
                    <p className="text-xs text-blue-600">{plant.lastWatered}</p>
                  </div>
                </div>
              </div>

              {/* Watering frequency card */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">
                  Water Frequency
                </h3>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-blue-800">
                    {plant.waterFrequency}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Plant details */}
          <div className="grid md:grid-cols-2 gap-8 px-8 bg-green-50 m-4 p-2 rounded-lg shadow-sm">
            <div>
              <h3 className="text-xl font-semibold border-b pb-2 mb-3">
                Care Instructions
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Water every {plant.waterFrequency}</li>
                <li>Place in bright, indirect light</li>
                <li>Keep away from drafts and cold windows</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold border-b pb-2 mb-3">
                  About This Plant
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  The {plant.plantType} is a popular houseplant known for its
                  unique appearance and relatively easy care requirements.
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                console.log(`Watering plant ${plant.id}`);
              }}
            >
              Mark as Watered
            </button>
          </div>
        </>
      </div>
    </div>
  );
};
