const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes");
const teamRoutes = require("./routes/team.routes");
const servicesRoutes = require("./routes/services.routes");
const eventsRoutes = require("./routes/events.routes");
const blogRoutes = require("./routes/blog.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// ✅ PRODUCTION SECURITY & PERFORMANCE
app.use(helmet({
  contentSecurityPolicy: false, // Set to false if you're loading external scripts/styles like FontAwesome CDNs
}));
app.use(compression());

// ✅ DYNAMIC CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);

// ✅ SERVE STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientBuildPath));

  app.get("(.*)", (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running in development mode...");
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;