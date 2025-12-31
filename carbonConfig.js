
const aircraftData = {
  // Données pour un avion court/moyen-courrier typique
  "Boeing 737-800": {
    fuelConsumptionPerKm: 2.6, // en kg de kérosène par km
    capacityEconomy: 150,
    capacityBusiness: 12,
  },
  // Données pour un avion long-courrier typique
  "Boeing 787-8": {
    fuelConsumptionPerKm: 5.5, // en kg de kérosène par km
    capacityEconomy: 250,
    capacityBusiness: 18,
  },
  // On peut ajouter d'autres types d'avions ici
};

const calculationConstants = {
  co2EmissionFactor: 3.16, // kg de CO2 par kg de kérosène
  radiativeForcingFactor: 1.9, // Facteur pour obtenir le CO2e
  classWeighting: {
    economy: 1,
    economy_flex: 1, // On considère que l'impact est le même que l'éco pour le moment
    business: 4,
  },
};

// --- NEW: Constants for Green Points Calculation ---
const pointCalculation = {
  baseConstant: 30000, // Scales points inversely to footprint. Adjusted for a good point range.
  safMultiplier: {     // Bonus multiplier for fares contributing to Sustainable Aviation Fuel
    economy: 1,
    economy_flex: 1.2, // 20% bonus for Economy Flex
    business: 1.5,     // 50% bonus for Business
  },
};


module.exports = {
  aircraftData,
  calculationConstants,
  pointCalculation,
};
