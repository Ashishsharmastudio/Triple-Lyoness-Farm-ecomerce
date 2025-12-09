const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

// 🏠 📂 Public Routes (Accessible to All Users)
router.get("/", serviceController.getAllServices); // Fetch all services with filtering
router.get("/search", serviceController.searchServices); // Search services by name or description

// 🔍 🔄 Filtering Routes (Fixed Order Issue)
router.get("/category/:category", serviceController.getServicesByCategory); // Filter services by category
router.get(
  "/solution-set/:solutionSet",
  serviceController.getServicesBySolutionSet
); // Filter services by solution set
router.get("/home-programs", serviceController.getHomeSpecificPrograms); // Get Home-Specific Programs
router.get("/smart-appliances", serviceController.getSmartAppliances); // Get Smart Appliances
router.get("/advanced-systems", serviceController.getAdvancedSystems); // Get Advanced Systems

// 🔐 🛠 Owner-Only Routes (Temporarily Open for Demo)
router.post("/", serviceController.createService); // Create a new service
router.put("/:id", serviceController.updateService); // Update service details
router.delete("/:id", serviceController.deleteService); // Soft delete service

// 🚀 Move `/:id` Last to Prevent Conflicts
router.get("/:id", serviceController.getServiceById); // Fetch service by ID

module.exports = router;
