const express = require("express");
const { register, login, users, updateUser, deleteUser, verifyotp, userProfile } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to register a new user
router.post("/register", register);
router.post("/verifyotp",verifyotp)
router.get("/users",users)
router.get("/userprofile",authMiddleware,userProfile)
router.put("/updateuser",authMiddleware,updateUser );
router.delete("/deleteuser/:id", deleteUser);


// Route to login an existing user
router.post("/login", login);


module.exports = router; // Export router for use in app.js