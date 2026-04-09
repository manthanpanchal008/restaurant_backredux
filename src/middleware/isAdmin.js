const isAdmin = (req, res, next) => {
  // Check if role exists and is 'admin' or 'superadmin' (case-insensitive)
  const userRole = req.user && req.user.role ? String(req.user.role).toLowerCase() : null;
  
  if (userRole === "admin" || userRole === "superadmin") {
    next();
  } else {
    console.log(`[ACL] 403 Forbidden: User ${req.user ? req.user.id : 'unknown'} attempted to access admin route with role: ${userRole}`);
    return res.status(403).json({ 
      success: false,
      message: "Access denied: Admin privileges required" 
    });
  }
};

module.exports = isAdmin;