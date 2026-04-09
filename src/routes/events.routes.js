const express = require('express');
const { getallgallary, addgallary, updategallary, deletegallary } = require('../controller/events.controller');
const upload = require('../middleware/upload');
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Public Routes
router.get('/', getallgallary);
router.get('/:id', getallgallary);

// Admin Only Routes
router.post('/', authMiddleware, isAdmin, upload.single("image"), addgallary);
router.put("/:id", authMiddleware, isAdmin, upload.single("image"), updategallary);
router.delete("/:id", authMiddleware, isAdmin, deletegallary);

module.exports = router;