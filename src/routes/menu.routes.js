const express = require('express');
const { additem, allitem, updateItem, deleteItem, item } = require('../controller/menu.controller');
const upload = require('../middleware/upload');

const router = express.Router();


router.post('/', upload.single("image"), additem);
router.get('/', allitem);
router.get('/:id', allitem);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);



module.exports = router; // Export router for use in app.js

