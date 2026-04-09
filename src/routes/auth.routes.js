const express = require("express");
const { register, login, users, updateUser, deleteUser, verifyotp, userProfile } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);
router.post("/verifyotp", verifyotp);

// Private Routes (Logged in users only)
router.get("/userprofile", authMiddleware, userProfile);
router.put("/updateuser", authMiddleware, updateUser);

// Admin Only Routes
router.get("/users", authMiddleware, isAdmin, users);
router.delete("/deleteuser/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;