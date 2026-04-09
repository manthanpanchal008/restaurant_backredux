const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
      try {
        const user = req.user;
        
        if (!allowedRoles.includes(user.role)) {
          return res.status(403).json({
            error: "Access denied",
          });
        }
        next();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  };
  
  module.exports = roleMiddleware;