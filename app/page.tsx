"use client";

import { useEffect, useState } from "react";
import PlantBox from "./components/PlantBox";
import AddPlantForm from "./components/AddPlantForm";
import { getUserPlants } from "@/lib/plantServices";
import { Plant } from "@/types/plant";
import { SelectedPlantPopup } from "./components/SelectedPlantPopup";
import DynamicBackground from "./components/DynamicBackground";
import TimeControlPanel from "./components/TimeControlPanel";

export default function Home() {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserPlants = async (userId: string) => {
      try {
        console.log("Fetching plants for user:", userId);
        const plants = await getUserPlants(userId);
        setPlants(plants);
      } catch (error) {
        console.error("Failed to fetch plants:", error);
      }
    };
    fetchUserPlants("1");
  }, []);

  const handlePlantClick = (index: number) => {
    setSelectedPlant(plants[index]);
  };

  useEffect(() => {
    if (selectedPlant) {
      console.log("Selected plant:", selectedPlant);
    } else {
      console.log("No plant selected");
    }
  }, [selectedPlant]);

  const handleAddPlant = (newPlant: Plant) => {
    // Add new plant to the state with a unique ID
    const plantToAdd = {
      ...newPlant,
    };
    setPlants((prevPlants) => [...prevPlants, plantToAdd]);
  };

  const handleTimeChange = (hour: number | null) => {
    setSimulatedHour(hour);
  };

  const IS_ADMIN = false;

  return (
    <div className="relative grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-6 md:p-12 md:px-10 lg:px-10">
      {/* Dynamic background component with simulated time */}
      <DynamicBackground simulatedHour={simulatedHour} />

      {/* Time control panel */}
      {IS_ADMIN ? <TimeControlPanel onTimeChange={handleTimeChange} /> : null}

      <main className="relative z-10 justify-self-center w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {plants.map((plant, _i) => (
            <PlantBox
              key={_i}
              index={_i}
              id={plant.id}
              imageUrl={plant.imageUrl}
              nickname={plant.nickname}
              plantType={plant.plantType}
              lastWatered={plant.lastWatered}
              waterFreqDays={plant.waterFreqDays}
              waterFrequency={plant.waterFrequency}
              onPress={handlePlantClick}
              simulatedHour={simulatedHour}
            />
          ))}
        </div>

        {showAddForm && (
          <AddPlantForm
            onClose={() => setShowAddForm(false)}
            onSuccess={handleAddPlant}
          />
        )}

        {selectedPlant ? (
          <SelectedPlantPopup
            plant={selectedPlant}
            onClose={() => setSelectedPlant(null)}
          />
        ) : null}
      </main>
      <div
        id="addPlantButton"
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-5 right-5 lg:bottom-15 lg:right-15 bg-green-400 rounded-full size-18 shadow-xl hover:bg-green-600 transition-colors text-3xl flex items-center justify-center p-4 cursor-pointer z-20"
      >
        +
      </div>
    </div>
  );
}
