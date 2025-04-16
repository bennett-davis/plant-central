"use client";

import { useEffect, useState } from "react";
import PlantBox from "./components/PlantBox";
import AddPlantForm from "./components/AddPlantForm";
import { getUserPlants } from "@/lib/plantServices";
import { Plant } from "@/types/plant";
import { SelectedPlantPopup } from "./components/SelectedPlantPopup";

export default function Home() {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);

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

  return (
    <div className="bg-green-50 grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 ">
      {/* <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">Plant Central</h1>
        <p className="text-gray-600">Manage your plant collection</p>
      </header> */}

      <main>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
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
            />
          ))}
        </div>
        <div
          id="addPlantButton"
          onClick={() => setShowAddForm(true)}
          className="absolute bottom-20 right-20 bg-green-400 rounded-full size-18 shadow-xl hover:bg-green-600 transition-colors text-3xl flex items-center justify-center p-4 cursor-pointer"
        >
          +
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
    </div>
  );
}
