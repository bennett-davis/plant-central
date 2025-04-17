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

// Time constants
export const DAY_START_HOUR = 6; // 6AM
export const DAY_END_HOUR = 19; // 7PM

// Check if it's nighttime based on the hour
export const isNighttime = (hour: number): boolean => {
  return hour >= DAY_END_HOUR || hour < DAY_START_HOUR;
};

// Calculate sun position based on time (between 6AM and 7PM)
export const calculateSunPosition = (date: Date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hour * 60 + minutes;

  // Day is from 6AM (360 mins) to 7PM (1140 mins) = 780 mins total
  // Map this to 0-100% for positioning
  const dayStartMinutes = DAY_START_HOUR * 60;
  const dayEndMinutes = DAY_END_HOUR * 60;
  const dayTotalMinutes = dayEndMinutes - dayStartMinutes;

  if (hour >= DAY_START_HOUR && hour < DAY_END_HOUR) {
    // Calculate horizontal position (left: 0-100%)
    const horizontalPosition =
      ((totalMinutes - dayStartMinutes) / dayTotalMinutes) * 100;

    // Calculate vertical position with arc (top: 5-50-5%)
    // Using a sine wave to create an arc effect
    const verticalPosition =
      50 - 45 * Math.sin((Math.PI * horizontalPosition) / 100);

    return {
      left: `${horizontalPosition}%`,
      top: `${verticalPosition}%`,
      progress: horizontalPosition / 100, // 0 to 1 progress through the day
    };
  }

  // Return default position if outside day hours
  return {
    left: "50%",
    top: "50%",
    progress: 0.5,
  };
};

// Get background classes based on time of day
export const getTimeBasedBackground = (
  isNight: boolean,
  transparency: number = 0.2
) => {
  if (isNight) {
    // Night mode - dark blue transparent background
    return `bg-white-800/100 backdrop-blur-lg`;
  } else {
    // Day mode - light green transparent background
    return `bg-green-50/${transparency} backdrop-blur-lg`;
  }
};

// Generate a color scheme based on time of day for components
export const getTimeBasedColorScheme = (date: Date) => {
  const hour = date.getHours();
  const isNight = isNighttime(hour);

  // Return color classes for various UI elements
  return {
    background: getTimeBasedBackground(isNight),
    text: isNight ? "text-white" : "text-gray-600",
    accent: isNight ? "bg-blue-600" : "bg-blue-500",
    isNight: isNight,
  };
};

export const getWaterPhrase = (level: number): string => {
  // Arrays of phrases for different water levels
  const criticalPhrases = [
    "Thirst Tracker: HELLO?? I’m Dying 🪴",
    "Last Watered: Ancient History 📜",
    "Soil Status: Sahara Mode Activated 🏜️",
    "Leaf Status: Crackly & Judging You",
    "Water Me or Lose Me 🌪️",
    "Plant Mood: Abandoned. Betrayed. Crispy.",
    "This is Fine 🔥🪴",
    "Dryer Than Your Group Chat",
    "SOS: Save Our Soil",
    "If I Had Knees, I’d Be Buckling",
    "Bone dry. Unlike your promises.",
    "Soil Condition: Cracked. Like our relationship.",
    "Just a reminder: Plants can’t cry for help :(",
    "Moisture Status: Not a drop left. Not even hope.",
    "Current Mood: Dehydrated and disappointed 💀",
    "If I wilt any harder, I’ll be a modern art piece.",
    "Last Watered: I don’t even remember you.",
    "Leaf Status: Crispy with a side of abandonment",
    "Dryer than your grandmother's elbows",
    "Water Level: 0% and 100% done with you",
    "Thirst Level: Off the charts. Like your excuses.",
    "Soil Status: Cracked and ready to file for divorce",
    "Leaf Alert: I’m not mad, just disappointed.",
    "Warning: Plant in Distress! 🚨",
    "*Cough Cough* I’m dying over here!",
    'Am I on the set of "Holes" right now?',
    "Me in about 5 minutes: 🪦",
    "Hasta la vista, moisture!",
    "I am straight up not having a good time.",
    "I don't need it... I definitely don't need it...",
  ];

  const lowPhrases = [
    "Warning: Sip Supply Running Low 🫗",
    "Moisture Check: Entering the Dry Zone",
    "Status: Not Panicking... Yet",
    "Leaf Alert: A Little Dry Around the Edges",
    "Hydration Needed: Soon-ish 🌾",
    "Thirst Level: Creeping Up",
    "Time for a Top-Up?",
    "Dry-ish. Like your sense of humor.",
    "Moisture Check: Dangerously close to crunchy",
    "Warning: Approaching Drama Levels",
    "Hydration: One missed day from leaf therapy",
    "Water Level: Flirting with dehydration 👀",
    "Running on fumes, but still fabulous",
  ];

  const mediumPhrases = [
    "Moisture Level: Still Kickin’ 🌱",
    "Thirst Tracker: Slightly Parched, Still Cool",
    "Hydration: Coasting on By",
    "Plant Mood: Mellow & Moist",
    "Status: Not Thirsty, Not Drenched—Just Right",
    "Leaf Check: Slightly Crispy, But Vibin’",
    "Water Meter: Middle of the Road",
    "Moisture Check: Still got that good drip 💧",
    "Hydration: Riding the wave 🌊",
    "Thirst Status: Kinda chill, kinda damp",
    "Leaf Report: Slightly soggy, thriving",
    "Still Moist: But keep your eyes on me 👀",
  ];

  const highPhrases = [
    "Moisture Status: Feeling Fresh 🌿",
    "Last Drink: Recently Hydrated",
    "Water Log: Hydrated + Happy",
    "Drip Status: Topped Off 💧",
    "Thirst Level: Low",
    "Plant Vibes: Sippin’ Smoothly",
    "Water Report: No Drought Detected",
    "Moisture Meter: Still Goin’ Strong!",
    "Hydration Level: Drenched and loving it 💅",
    "Soil Status: Soaked like a drama queen in the rain",
    "Leaf Mood: Glossy, glowy, and a little smug",
    "Too much water? Never heard of her.",
    "Moisture Check: Wet enough to start a ripple effect",
    "I could do synchronized swimming at this point 🏊‍♂️",
    "Drip Status: Hydro-flexin’ on the dry folks",
  ];

  let phrases;

  // Determine which set of phrases to use
  if (level <= 0) {
    phrases = criticalPhrases;
  } else if (level <= 30) {
    phrases = lowPhrases;
  } else if (level <= 80) {
    phrases = mediumPhrases;
  } else {
    phrases = highPhrases;
  }

  // Select a random phrase
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};

export const getStatusBackground = (level: number) => {
  if (level <= 0) {
    return "bg-red-500/50";
  } else if (level <= 30) {
    return "bg-yellow-500/50";
  } else if (level <= 80) {
    return "bg-green-500/50";
  } else {
    return "bg-blue-500/50";
  }
};
