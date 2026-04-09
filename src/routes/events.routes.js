const express = require('express');
const { getallgallary, addgallary, updategallary, deletegallary } = require('../controller/events.controller');
const upload = require('../middleware/upload');

const router = express.Router()

router.get('/',getallgallary)
router.get('/:id', getallgallary);
router.post('/',upload.single("image"),addgallary)
router.put("/:id", upload.single("image"), updategallary);
router.delete("/:id", deletegallary);


module.exports = router