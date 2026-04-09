const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {
  getAllUsers,
  makeAdmin,
  removeAdmin,
} = require("../controller/admin.controller");

// ✅ GET USERS
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  getAllUsers
);

// ✅ MAKE ADMIN
router.put(
  "/make-admin/:id",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  makeAdmin
);

// ✅ REMOVE ADMIN
router.put(
  "/remove-admin/:id",
  authMiddleware,
  roleMiddleware("SUPERADMIN"),
  removeAdmin
);

module.exports = router;