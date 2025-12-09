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

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://appointment-booking-pi.vercel.app",
    ], // Allow your frontend domain
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
