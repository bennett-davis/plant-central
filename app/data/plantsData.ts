export interface PlantBoxData {
  id: number;
  imageUrl: string;
  title: string;
  plantType: string;
  lastWatered?: string;
  waterDuration?: string;
  waterFrequency?: string;
  waterLevel?: number;
}

export const plantsData: PlantBoxData[] = [
  {
    id: 1,
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/56923fa6a976af0bfc533475/4487beac-be01-4ad5-8133-3276fb81972b/IMG_7938.jpg",
    title: "Plant 1",
    plantType: "Monstera Deliciosa",
    lastWatered: "2025-03-28",
    waterDuration: "45 seconds",
    waterFrequency: "7-10 days",
    waterLevel: 68,
  },
  {
    id: 2,
    imageUrl:
      "https://www.thespruce.com/thmb/JToiCM2g8ssRFBOyIvvB_G5pMDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg",
    title: "Plant 2",
    plantType: "Snake Plant",
    lastWatered: "2025-03-15",
    waterDuration: "20 seconds",
    waterFrequency: "3-4 weeks",
    waterLevel: 42,
  },
  {
    id: 3,
    imageUrl:
      "https://media.houseandgarden.co.uk/photos/64bff5f4d6a55acd0397054e/3:2/w_1341,h_894,c_limit/Screenshot%202023-07-25%20at%2017.17.10.png",

    title: "Plant 3",
    plantType: "Pothos",
    lastWatered: "2025-03-26",
    waterDuration: "30 seconds",
    waterFrequency: "7-14 days",
    waterLevel: 75,
  },
  {
    id: 4,
    imageUrl:
      "https://www.thespruce.com/thmb/lqtFsKArHjDEugR06R3k1EZHs58=/6590x0/filters:no_upscale():max_bytes(150000):strip_icc()/grow-fiddle-leaf-fig-indoors-1902756-hero-feca31e64e91430794e2bdcc9fa1e901.jpg",
    title: "Plant 4",
    plantType: "Fiddle Leaf Fig",
    lastWatered: "2025-03-31",
    waterDuration: "60 seconds",
    waterFrequency: "7 days",
    waterLevel: 88,
  },
  {
    id: 5,
    imageUrl:
      "https://nouveauraw.com/wp-content/uploads/2020/01/aloe-plant-800.png",

    title: "Plant 5",
    plantType: "Aloe Vera",
    lastWatered: "2025-03-12",
    waterDuration: "15 seconds",
    waterFrequency: "3-4 weeks",
    waterLevel: 35,
  },
  {
    id: 6,
    imageUrl:
      "https://cdn11.bigcommerce.com/s-dblrqw/images/stencil/1280x1280/products/775/1833/peace_lily_8__79629.1709737829.jpg?c=2",

    title: "Plant 6",
    plantType: "Peace Lily",
    lastWatered: "2025-03-30",
    waterDuration: "40 seconds",
    waterFrequency: "5-7 days",
    waterLevel: 80,
  },
  // {
  //   id: 7,
  //   imageUrl:
  //     "https://www.thespruce.com/thmb/JToiCM2g8ssRFBOyIvvB_G5pMDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg",

  //   title: "Plant 7",
  //   plantType: "ZZ Plant",
  //   lastWatered: "2025-03-18",
  //   waterDuration: "25 seconds",
  //   waterFrequency: "2-3 weeks",
  //   waterLevel: 55,
  // },
  // {
  //   id: 8,
  //   imageUrl:
  //     "https://www.thespruce.com/thmb/JToiCM2g8ssRFBOyIvvB_G5pMDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg",

  //   title: "Plant 8",
  //   plantType: "Spider Plant",
  //   lastWatered: "2025-03-25",
  //   waterDuration: "35 seconds",
  //   waterFrequency: "7-10 days",
  //   waterLevel: 65,
  // },
];
