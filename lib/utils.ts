export const calculateWaterLevel = (
  lastWatered: string,
  waterFreqDays: number
) => {
  const lastWateredDate = new Date(lastWatered);
  const today = new Date();
  const diffTime = today.getTime() - lastWateredDate.getTime();
  const daysSinceWatering = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Calculate percentage of water remaining
  // 100% when just watered, 0% when it's time to water again or overdue
  const waterRemaining = Math.max(
    0,
    100 - (daysSinceWatering / waterFreqDays) * 100
  );

  return Math.round(waterRemaining); // Round to nearest percentage
};
