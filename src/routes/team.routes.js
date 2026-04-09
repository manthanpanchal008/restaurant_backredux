const express = require('express');
const { addteam, getallteam, updateteam, deleteteam } = require('../controller/team.controller');
const upload = require('../middleware/upload');
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router  = express.Router();

// Public Routes
router.get('/', getallteam);
router.get('/:id', getallteam);

// Admin Only Routes
router.post('/', authMiddleware, isAdmin, upload.single("profile"), addteam);
router.put("/:id", authMiddleware, isAdmin, upload.single("profile"), updateteam);
router.delete("/:id", authMiddleware, isAdmin, deleteteam);

module.exports = router;