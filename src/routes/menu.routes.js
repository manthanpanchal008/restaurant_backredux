const express = require('express');
const { additem, allitem, updateItem, deleteItem, item } = require('../controller/menu.controller');
const upload = require('../middleware/upload');
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Public Routes
router.get('/', allitem);
router.get('/:id', allitem);

// Admin Only Routes
router.post('/', authMiddleware, isAdmin, upload.single("image"), additem);
router.put("/:id", authMiddleware, isAdmin, upload.single("image"), updateItem);
router.delete("/:id", authMiddleware, isAdmin, deleteItem);

module.exports = router;
