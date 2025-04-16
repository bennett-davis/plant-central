"use client";

import { useState } from "react";
import { updatePlantWateringDate } from "@/lib/plantServices";

interface WateringDatePopupProps {
  plantId: string;
  userId: string;
  onClose: () => void;
  onSuccess: (newDate: string) => void;
}

export default function WateringDatePopup({
  plantId,
  userId,
  onClose,
  onSuccess,
}: WateringDatePopupProps) {
  // Default to today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await updatePlantWateringDate(userId, plantId, selectedDate);
      onSuccess(selectedDate);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update watering date"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm rounded-xl"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-green-800 mb-4">Water Plant</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="wateringDate"
              className="block text-sm font-medium text-gray-700"
            >
              When did you water this plant?
            </label>
            <input
              id="wateringDate"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={today} // Can't select future dates
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
