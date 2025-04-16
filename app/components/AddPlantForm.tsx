import { useState } from "react";
import { addPlant } from "../../lib/plantServices";
import { Plant } from "@/types/plant";

interface AddPlantFormProps {
  onClose: () => void;
  onSuccess: (newPlant: Plant) => void;
}

const userId = "1";

const defaultPlantImage =
  "https://images.unsplash.com/photo-1502394202744-021cfbb17454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBsYW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

export default function AddPlantForm({
  onClose,
  onSuccess,
}: AddPlantFormProps) {
  const [formData, setFormData] = useState({
    nickname: "",
    plantType: "",
    imageUrl: defaultPlantImage,
    waterFrequency: "Every 7 days",
    waterLevel: 100,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const waterFrequencyOptions = [
    "Every 3 days",
    "Every 5 days",
    "Every 7 days",
    "Every 10 days",
    "Every 14 days",
    "Every 30 days",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Ensure plantType is provided
      if (!formData.plantType.trim()) {
        throw new Error("Plant type is required");
      }

      // Use a default nickname if not provided
      const plantData = {
        ...formData,
        nickname: formData.nickname.trim() || `My ${formData.plantType}`,
      };

      const newPlant = await addPlant(plantData, userId);
      onSuccess(newPlant);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add plant");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-16 bg-gradient-to-r from-green-700 to-emerald-500 rounded-t-2xl flex items-center justify-center relative">
          <h2 className="text-2xl font-bold text-white">Add New Plant</h2>
          <button
            onClick={onClose}
            className="absolute right-4 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-white transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="plantType"
              className="block text-sm font-medium text-gray-700"
            >
              Plant Type <span className="text-red-500">*</span>
            </label>
            <input
              id="plantType"
              name="plantType"
              type="text"
              required
              value={formData.plantType}
              onChange={handleChange}
              placeholder="e.g., Monstera, Snake Plant, Pothos"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700"
            >
              Plant Name (Optional)
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Give your plant a name"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL (Optional)
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/plant-image.jpg"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="waterFrequency"
                className="block text-sm font-medium text-gray-700"
              >
                Water Frequency
              </label>
              <select
                id="waterFrequency"
                name="waterFrequency"
                value={formData.waterFrequency}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {waterFrequencyOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
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
              {isSubmitting ? "Adding..." : "Add Plant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
