const express = require('express');
const { addService, getAllServices, updateService, deleteService } = require('../controller/services.controller');
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router  = express.Router();

// Public Routes
router.get('/', getAllServices);
router.get('/:id', getAllServices);

// Admin Only Routes
router.post('/', authMiddleware, isAdmin, addService);
router.put("/:id", authMiddleware, isAdmin, updateService);
router.delete("/:id", authMiddleware, isAdmin, deleteService);

module.exports = router;