const multer = require("multer");

// Use memory storage to temporarily store uploaded files in memory
const storage = multer.memoryStorage();

// Create multer upload instance
const upload = multer({ storage });

module.exports = upload; // Export for use in routes