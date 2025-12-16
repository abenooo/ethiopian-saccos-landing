export interface RegionData {
  name: string
  saccos: number
  members: string
  capital: string
  position: [number, number, number]
}

export const saccoData: RegionData[] = [
  {
    name: "Tigray",
    saccos: 1400,
    members: "~750,000",
    capital: "~1.4B ETB",
    position: [-0.8, 0.15, 2.4], // Far north
  },
  {
    name: "Afar",
    saccos: 210,
    members: "~35,000",
    capital: "~83M ETB",
    position: [1.2, 0.15, 1.8], // Northeast
  },
  {
    name: "Amhara",
    saccos: 4200,
    members: "~1,100,000",
    capital: "~5.2B ETB",
    position: [-0.5, 0.15, 0.8], // North-central (large region)
  },
  {
    name: "Benishangul-Gumuz",
    saccos: 100,
    members: "~25,000",
    capital: "~64M ETB",
    position: [-2.0, 0.15, 0.5], // Far northwest
  },
  {
    name: "Addis Ababa",
    saccos: 2800,
    members: "~1,200,000",
    capital: "~13.5B ETB",
    position: [-0.3, 0.2, 0.1], // Central capital (elevated for visibility)
  },
  {
    name: "Dire Dawa",
    saccos: 104,
    members: "~22,000",
    capital: "~318M ETB",
    position: [1.4, 0.15, 0.3], // East
  },
  {
    name: "Harari",
    saccos: 95,
    members: "~15,000",
    capital: "~56M ETB",
    position: [1.3, 0.15, 0.1], // Small eastern enclave near Dire Dawa
  },
  {
    name: "Somali",
    saccos: 450,
    members: "~180,000",
    capital: "~200M ETB",
    position: [1.8, 0.15, -0.5], // Large eastern region within Ethiopia
  },
  {
    name: "Oromia",
    saccos: 8200,
    members: "~2,850,000",
    capital: "~9.4B ETB",
    position: [0.3, 0.15, -0.4], // Large central-eastern-southern region
  },
  {
    name: "Gambella",
    saccos: 120,
    members: "~28,000",
    capital: "~164M ETB",
    position: [-2.2, 0.15, -0.5], // Far west
  },
  {
    name: "Central Ethiopia",
    saccos: 5600,
    members: "~1,250,000",
    capital: "~1.0B ETB",
    position: [-0.2, 0.15, -0.8], // South-central
  },
  {
    name: "Sidama",
    saccos: 380,
    members: "~125,000",
    capital: "~350M ETB",
    position: [0.2, 0.15, -1.1], // South (small enclave)
  },
  {
    name: "South West Ethiopia",
    saccos: 5600,
    members: "~1,250,000",
    capital: "~1.0B ETB",
    position: [-1.2, 0.15, -1.3], // Southwest
  },
  {
    name: "South Ethiopia",
    saccos: 5600,
    members: "~1,250,000",
    capital: "~1.0B ETB",
    position: [-0.1, 0.15, -1.8], // Deep south
  },
]
