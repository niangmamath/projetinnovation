require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/Flight');

// --- Royal Air Maroc Flight Data ---
// Added distance (in km) and aircraftType for carbon calculation
const flightData = [
  {
    from: 'Casablanca, Morocco',
    to: 'New York, USA',
    airline: 'Royal Air Maroc',
    date: new Date('2024-10-15T10:00:00Z'),
    departure_time: '10:00',
    arrival_time: '13:30',
    duration: 8.5,
    price: { economy: 8500, business: 25000 },
    distance: 5800, // Distance in km
    aircraftType: 'Boeing 787-8',
    greenPoints: 1200,
  },
  {
    from: 'Casablanca, Morocco',
    to: 'Paris, France',
    airline: 'Royal Air Maroc',
    date: new Date('2024-11-05T07:30:00Z'),
    departure_time: '07:30',
    arrival_time: '11:30',
    duration: 3,
    price: { economy: 3500, business: 7000 },
    distance: 1900, // Distance in km
    aircraftType: 'Boeing 737-800',
    greenPoints: 400,
  },
  {
    from: 'Casablanca, Morocco',
    to: 'Dakar, Senegal',
    airline: 'Royal Air Maroc',
    date: new Date('2024-11-20T22:00:00Z'),
    departure_time: '22:00',
    arrival_time: '01:45',
    duration: 3.75,
    price: { economy: 4000, business: 8500 },
    distance: 2300, // Distance in km
    aircraftType: 'Boeing 737-800',
    greenPoints: 500,
  },
  {
    from: 'Marrakech, Morocco',
    to: 'London, UK',
    airline: 'Royal Air Maroc',
    date: new Date('2024-12-01T15:00:00Z'),
    departure_time: '15:00',
    arrival_time: '18:30',
    duration: 3.5,
    price: { economy: 2800, business: 6000 },
    distance: 2200, // Distance in km
    aircraftType: 'Boeing 737-800',
    greenPoints: 450,
  },
  {
    from: 'Casablanca, Morocco',
    to: 'Montreal, Canada',
    airline: 'Royal Air Maroc',
    date: new Date('2024-10-28T13:00:00Z'),
    departure_time: '13:00',
    arrival_time: '15:45',
    duration: 7.75,
    price: { economy: 9800, business: 28000 },
    distance: 5600, // Distance in km
    aircraftType: 'Boeing 787-8',
    greenPoints: 1100,
  },
  {
    from: 'Rabat, Morocco',
    to: 'Brussels, Belgium',
    airline: 'Royal Air Maroc',
    date: new Date('2024-11-12T09:00:00Z'),
    departure_time: '09:00',
    arrival_time: '13:00',
    duration: 3,
    price: { economy: 2500, business: 5500 },
    distance: 2200, // Distance in km
    aircraftType: 'Boeing 737-800',
    greenPoints: 350,
  },
];

async function seedDatabase() {
  const MONGO_URI = process.env.MONGODB_URI;
  if (!MONGO_URI) {
    throw new Error('Please define MONGODB_URI in your .env file');
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    console.log('Deleting existing flights...');
    await Flight.deleteMany({});

    console.log('Inserting new Royal Air Maroc flights...');
    await Flight.insertMany(flightData);

    console.log('Database has been successfully seeded with new data!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected.');
  }
}

seedDatabase();
