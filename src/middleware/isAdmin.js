const isAdmin = (req, res, next) => {
  // Check if role exists and is 'admin' (case-insensitive)
  if (req.user && String(req.user.role).toLowerCase() === "admin") {
    next();
  } else {
    return res.status(403).json({ 
      success: false,
      message: "Access denied: Admin privileges required" 
    });
  }
};

module.exports = isAdmin;