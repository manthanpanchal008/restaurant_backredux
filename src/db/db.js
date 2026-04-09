const mongoose = require('mongoose');

// Function to connect to MongoDB
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT); // Connect using connection string from .env
    console.log("database connected");
  } catch (error) {
    console.log("error=>", error); // Log connection errors
  }
};

module.exports = dbconnect; // Export function for use in server.js