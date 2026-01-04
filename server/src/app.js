const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("../config/database");

const authRoutes = require("../routes/auth");
const appointmentRoutes = require("../routes/appointments");
const serviceRoutes = require("../routes/services");
const dashboardRoutes = require("../routes/dashboard");
const chatRoutes = require("../routes/chat.route.js");
const app = express();

// Check for allowedOrigins in .env (user specified) or CORS_ORIGIN
const envAllowedOrigins = process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGIN;
let corsOrigins = envAllowedOrigins;
if (envAllowedOrigins) {
  const envOrigins = envAllowedOrigins.split(",").map(origin => origin.trim());
  corsOrigins = envOrigins;
}

app.use(
  cors({
    origin: corsOrigins,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// Home route for service checking
app.get("/home", (req, res) => {
  res.status(200).json({ message: "Service is running successfully!" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;
