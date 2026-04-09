// Load environment variables
require("dotenv").config();

const app = require("./src/app"); // Import Express app
const dbconnect = require("./src/db/db"); // Import database connection

const PORT = process.env.PORT || 3000; // Set server port

dbconnect(); // Connect to database

console.log("Starting server...");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Start server
});