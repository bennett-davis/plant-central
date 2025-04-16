import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Plant } from "../types/plant";

export const addPlant = async (
  plantData: Omit<Plant, "id" | "lastWatered">,
  userId: string
) => {
  // Parse water frequency string (e.g., "every 7 days") to a number
  const waterFreqDays = plantData.waterFrequency
    ? parseInt(plantData.waterFrequency.match(/\d+/)?.[0] || "0", 10)
    : 0;

  try {
    // Add current date as lastWatered
    const newPlant = {
      ...plantData,
      lastWatered: new Date().toISOString().split("T")[0],
      waterFreqDays,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, `users/${userId}/plants`),
      newPlant
    );
    return {
      id: docRef.id,
      ...newPlant,
    };
  } catch (error) {
    console.error("Error adding plant: ", error);
    throw error;
  }
};

/**
 * Fetches all plants for a specific user
 * @param userId - The ID of the user whose plants to fetch
 * @returns A promise that resolves to an array of plants
 */
export const getUserPlants = async (userId: string): Promise<Plant[]> => {
  try {
    // Create reference to the user's plants subcollection
    const plantsCollectionRef = collection(db, `users/${userId}/plants`);

    // Optional: create a query to sort plants by creation date
    const plantsQuery = query(
      plantsCollectionRef
      // orderBy("createdAt", "desc")
    );

    // Execute the query and get the documents
    const querySnapshot = await getDocs(plantsQuery);
    // Map the document data to Plant objects with IDs
    const plants: Plant[] = [];
    querySnapshot.forEach((doc) => {
      const plantData = doc.data();
      console.log("Plant data:", doc.id);
      plants.push({
        id: doc.id, // Converting string ID to number to match your Plant interface
        nickname: plantData.nickname || "",
        plantType: plantData.plantType || "",
        imageUrl: plantData.imageUrl || "",
        lastWatered: plantData.lastWatered,
        waterFrequency: plantData.waterFrequency || "",
        waterFreqDays: plantData.waterFreqDays || 0,
        ...plantData,
      });
    });

    return plants;
  } catch (error) {
    console.error("Error fetching user plants: ", error);
    throw error;
  }
};

/**
 * Updates the lastWatered date for a specific plant
 * @param userId - The ID of the user
 * @param plantId - The ID of the plant to update
 * @param lastWateredDate - The new lastWatered date
 */
export const updatePlantWateringDate = async (
  userId: string,
  plantId: string,
  lastWateredDate: string
): Promise<void> => {
  try {
    const plantDocRef = doc(db, `users/${userId}/plants/${plantId}`);
    await updateDoc(plantDocRef, {
      lastWatered: lastWateredDate,
    });
    console.log(
      `Updated watering date for plant ${plantId} to ${lastWateredDate}`
    );
  } catch (error) {
    console.error("Error updating plant watering date: ", error);
    throw error;
  }
};
