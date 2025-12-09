const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const auth = require("../middleware/auth");
const isOwner = require("../middleware/isOwner");

router.get("/stats", auth, isOwner, dashboardController.getDashboardStats);
router.get(
  "/services",
  auth,
  isOwner,
  dashboardController.getServiceManagement
);

module.exports = router;
