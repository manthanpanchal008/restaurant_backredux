const express = require('express');
const { getAllBlogs, addBlog, updateBlog, deleteBlog } = require('../controller/blog.controller');
const upload = require('../middleware/upload');
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router  = express.Router();

// Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getAllBlogs);

// Admin Only Routes
router.post('/', authMiddleware, isAdmin, upload.single("img"), addBlog);
router.put("/:id", authMiddleware, isAdmin, upload.single("img"), updateBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;