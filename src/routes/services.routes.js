const express = require('express');
const { addService, getAllServices, updateService, deleteService } = require('../controller/services.controller');


const router  = express.Router()

router.get('/',getAllServices) // router to get all services
router.get('/:id',getAllServices) // router to get all services
router.post('/',addService ) //  router to add service
router.put("/:id", updateService);
router.delete("/:id", deleteService);
module.exports = router