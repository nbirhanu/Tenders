const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tender = require('./../models/tenderModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB);

// Connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Close the Mongoose connection when the Node process is terminated
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

const tenders = JSON.parse(
  fs.readFileSync(`${__dirname}/allTenders.json`, 'utf-8')
);

//IMPORTING ALL DOCUMENTS
const importAllData = async () => {
  try {
    await Tender.create(tenders);
    console.log('data successfully loading');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE AL DATA
const deleteAllData = async () => {
  try {
    await Tender.deleteMany();
    console.log('data successfully deleting ');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importAllData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}
