const { aircraftData, calculationConstants } = require('../carbonConfig');

const calculateCarbonFootprint = (flight, selectedClass) => {
  const aircraft = aircraftData[flight.aircraftType];
  if (!aircraft) {
    console.error('Aircraft data not found for type:', flight.aircraftType);
    return 0;
  }

  // 1. Calculate total flight emissions
  const totalFuel = flight.distance * aircraft.fuelConsumptionPerKm;
  const totalCo2 = totalFuel * calculationConstants.co2EmissionFactor;
  const totalCo2e = totalCo2 * calculationConstants.radiativeForcingFactor;

  // 2. Distribute emissions among passengers
  const classWeights = calculationConstants.classWeighting;
  const totalWeightedPassengerUnits =
    aircraft.capacityEconomy * classWeights.economy +
    aircraft.capacityBusiness * classWeights.business;

  const emissionsPerUnit = totalCo2e / totalWeightedPassengerUnits;

  // 3. Calculate individual passenger footprint
  const passengerFootprint = emissionsPerUnit * classWeights[selectedClass];

  return Math.round(passengerFootprint); // Return in kg
};

module.exports = { calculateCarbonFootprint };
