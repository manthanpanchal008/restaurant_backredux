const express = require("express");

const router = express.Router();

const { placeOrder,getOrder, getAllOrders, updateOrderStatus } = require("../controller/order.controller");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
// const { protect } = require("../middleware/auth.middleware");

router.post("/",authMiddleware,placeOrder);
router.get("/",authMiddleware,getOrder)
router.get("/all", authMiddleware, isAdmin, getAllOrders);
router.put("/status/:id", authMiddleware, isAdmin, updateOrderStatus);
module.exports = router;