const express = require('express');
const { addteam, getallteam, updateteam, deleteteam } = require('../controller/team.controller');
const upload = require('../middleware/upload');

const router  = express.Router()

router.get('/',getallteam)
router.get('/:id',getallteam)
router.post('/', upload.single("profile"),addteam)
router.put("/:id", upload.single("profile"), updateteam);
router.delete("/:id", deleteteam);

module.exports = router