const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes"); // Auth-related routes
const menuRoutes = require("./routes/menu.routes"); // Menu-related routes
const teamRoutes = require("./routes/team.routes") //team-related routes
const servicesRoutes = require("./routes/services.routes") // services-realted routes
const eventsRoutes = require("./routes/events.routes") ///event routes
const blogRoutes = require("./routes/blog.routes") //blog routes
const orderRoutes = require("./routes/order.routes")
const adminRoutes = require("./routes/admin.routes");

const app = express();

// Enable CORS for specified origins
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://restaurant-frontend-amber-kappa.vercel.app",     
  ],
  credentials: true
}));

app.options("/*", cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());



// Test route to check if API is running
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/order",orderRoutes)
app.use("/api/admin",adminRoutes)

module.exports = app; // Export app for server.js