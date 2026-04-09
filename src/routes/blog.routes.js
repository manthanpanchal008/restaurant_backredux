const express = require('express');
const { getAllBlogs, addBlog, updateBlog, deleteBlog } = require('../controller/blog.controller');
const upload = require('../middleware/upload');

const router  = express.Router()

router.get('/',getAllBlogs) // router to get all services
router.get('/:id',getAllBlogs) // router to get all services
router.post('/', upload.single("img"),addBlog ) //  router to add service
router.put("/:id", upload.single("img"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router